import { Schema, model, Document, Model } from "mongoose";

export interface IArchivedItem extends Document {
  originCollection: string;
  doc: any;
  restore: (
    restoreGlueFn: (originCollection: string, doc: any) => Promise<void>
  ) => Promise<void>;
}

const archivedItemSchema = new Schema(
  {
    originCollection: {
      type: String
    },
    doc: {
      type: Schema.Types.Mixed
    }
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  }
);

archivedItemSchema.methods.restore = async function(
  restoreGlueFn: (originCollection: string, doc: any) => Promise<void>
) {
  try {
    await restoreGlueFn(this.originCollection, this.doc);
    await this.remove();
  } catch (error) {
    throw error;
  }
};

const ArchivedItem: Model<IArchivedItem> = model<IArchivedItem>(
  "ArchivedItem",
  archivedItemSchema
);
export { ArchivedItem };
