import { Schema } from "mongoose";
import { ArchivedItem } from "./model";

interface Options {
  throwOnError: boolean;
}

function trashcan(schema: Schema, options: Options) {
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
            await ArchivedItem.create({
              originCollection,
              doc
            });
          }
        }
      } catch (error) {
        if (options && options.throwOnError) {
          throw error;
        } else {
          console.warn("Failed to archive document", error);
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

const anyDeleteOrRemove = /remove|deleteOne|deleteMany|findOneAndRemove|findOneAndDelete|findByIdAndRemove/;
