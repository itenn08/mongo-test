import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { PageCategoryView } from "src/interfaces/page-category.interface";

@Schema({
  versionKey: false,
  toJSON: {
    getters: true,
  },
  timestamps: true,
})
export class PageCategory extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  link: string;

  @Prop({ type: String })
  parent: {
    type: String;
    default: null;
  };

  @Prop({ type: String })
  type: {
    type: String;
    default: null;
  };

  @Prop({ default: 0 })
  order: Number;
}

export const PageCategorySchema = SchemaFactory.createForClass(PageCategory);
