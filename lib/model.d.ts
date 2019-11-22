import { Document, Model } from "mongoose";
export interface IArchivedItem extends Document {
    originCollection: string;
    doc: any;
    restore: (restoreGlueFn: (originCollection: string, doc: any) => Promise<void>) => Promise<void>;
}
declare const ArchivedItem: Model<IArchivedItem>;
export { ArchivedItem };
