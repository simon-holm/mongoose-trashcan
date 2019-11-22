/**
 *
 * Example model for the ArchiveItemModel in a JS project
 */

import { Schema, model } from "mongoose";

const archivedItemSchema = new Schema(
  {
    originCollection: {
      type: String,
      required: true
    },
    doc: {
      type: Schema.Types.Mixed,
      required: true
    }
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  }
);

archivedItemSchema.methods.restore = async function(restoreGlueFn) {
  try {
    await restoreGlueFn(this.originCollection, this.doc);
    await this.remove();
  } catch (error) {
    throw error;
  }
};

const ArchivedItemModel = model("ArchivedItem", archivedItemSchema);
export { ArchivedItemModel };
