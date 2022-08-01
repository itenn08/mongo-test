import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({
  versionKey: false,
  toJSON: {
    getters: true,
  },
})
export class Page extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  url: string;

  @Prop({ type: Types.ObjectId, required: false, ref: "PageCategory" })
  category: Types.ObjectId;

  @Prop()
  content: string;

  @Prop()
  seoTitle: string;

  @Prop()
  seoDescription: string;

  @Prop()
  isActive: Boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const PageSchema = SchemaFactory.createForClass(Page);
