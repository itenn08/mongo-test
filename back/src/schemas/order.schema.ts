import { Base } from "@typegoose/typegoose/lib/defaultClasses";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ _id: false })
export class OrderProduct extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: "Products" })
  product: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;
}

export const OrderProductSchema = SchemaFactory.createForClass(OrderProduct);

@Schema({
  versionKey: false,
  toJSON: {
    getters: true,
  },
  timestamps: true,
})
export class Order extends Document implements Base {
  _id!: Types.ObjectId;

  id!: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  number_phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  status:
    | "closed"
    | "processing"
    | "approved"
    | "pending"
    | "removed"
    | "open"
    | "complete"
    | "canceled";

  @Prop()
  text: string | null;

  @Prop({ required: true, type: [OrderProductSchema] })
  products: Array<OrderProduct>;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
