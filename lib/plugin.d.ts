import { Schema, Model, Document } from "mongoose";
interface IArchivedItem extends Document {
    originCollection: string;
    doc: any;
    restore: (restoreGlueFn: (originCollection: string, doc: any) => Promise<void>) => Promise<void>;
}
interface Options {
    throwOnError: boolean;
    ArchivedItemModel: Model<IArchivedItem, {}>;
}
declare function trashcan(schema: Schema, options: Options): void;
export { trashcan };
