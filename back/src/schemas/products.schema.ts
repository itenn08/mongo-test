import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;

  @Prop({ type: Types.ObjectId, required: false, ref: "PageCategory" })
  category: Types.ObjectId;

  @Prop()
  seoTitle: string;

  @Prop()
  seoDescription: string;

  @Prop()
  photoUrl: string;

  @Prop()
  price: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  isActive: boolean;

  @Prop()
  quantity: number;

  @Prop()
  text: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
