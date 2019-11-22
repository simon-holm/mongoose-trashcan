import { Schema, Model, Document } from "mongoose";

interface IArchivedItem extends Document {
  originCollection: string;
  doc: any;
  restore: (
    restoreGlueFn: (originCollection: string, doc: any) => Promise<void>
  ) => Promise<void>;
}

interface Options {
  throwOnError: boolean;
  ArchivedItemModel: Model<IArchivedItem, {}>;
}

const anyDeleteOrRemove = /remove|deleteOne|deleteMany|findOneAndRemove|findOneAndDelete|findByIdAndRemove/;

function trashcan(schema: Schema, options: Options) {
  if (!options || (options && !options.ArchivedItemModel)) {
    throw "ArchivedItemModel must be provided to the trashcan plugin options";
  }

  schema.pre(
    anyDeleteOrRemove,
    // @ts-ignore
    { query: true, document: true },
    async function(next: any) {
      // @ts-ignore
      const self = this as any;
      try {
        let originCollection;
        let docs = [];
        if (isMongooseQuery(self)) {
          const filter = self.getFilter();
          originCollection = self.mongooseCollection.name;
          docs = await self.model.find(filter);
        } else {
          docs[0] = self;
          originCollection = self.constructor.collection.name;
        }

        next();

        if (docs.length > 0) {
          for (let doc of docs) {
            await options.ArchivedItemModel.create({
              originCollection,
              doc
            });
          }
        }
      } catch (error) {
        if (options && options.throwOnError) {
          throw error;
        } else {
          console.log("Failed to archive document", error);
        }
      }
    }
  );
}

export { trashcan };

const isMongooseQuery = (obj: any) => {
  if (
    obj.hasOwnProperty("mongooseCollection") &&
    obj.hasOwnProperty("schema") &&
    obj.hasOwnProperty("op") &&
    obj.hasOwnProperty("model")
  ) {
    return true;
  }

  return false;
};
