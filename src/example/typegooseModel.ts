/**
 *
 * Example model for the ArchiveItemModel in a Typegoose project
 */

import {
  getModelForClass,
  modelOptions,
  prop,
  DocumentType
} from "@typegoose/typegoose";
import { Types } from "mongoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class ArchivedItem {
  _id!: Types.ObjectId;

  @prop()
  originCollection!: string;

  @prop()
  doc!: any;

  public async restore<T>(
    this: DocumentType<ArchivedItem>,
    restoreGlue: (originCollection: string, doc: T) => Promise<void>
  ) {
    try {
      await restoreGlue(this.originCollection, this.doc);
      await this.remove();
    } catch (error) {
      throw error;
    }
  }
}

export const ArchivedItemModel = getModelForClass(ArchivedItem);
