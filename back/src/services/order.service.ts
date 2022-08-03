import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Schema as MongooseSchema } from "mongoose";

import { OrderDto } from "./../dto/order.dto";
import { Order } from "src/schemas/order.schema";

@Injectable()
export class OrderService {
  constructor(@InjectModel("Order") private orderModel: Model<Order>) {}

  async create(body: OrderDto) {
    const order = new this.orderModel({
      firstName: body.firstName,
      lastName: body.lastName,
      number_phone: body.number_phone || null,
      address: body.address || "",
      status: body.status || "",
      text: body.text || "",
      products: body.products,
    });

    try {
      await order.save();
      return { product: order._id };
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    pageIndex?: number,
    pageSize?: number,
    query?: string,
    date?: string
  ) {
    try {
      const products = await this.orderModel
        .find({
          ...(query && { number_phone: { $regex: `${query}`, $options: "i" } }),
          ...(date && { createdAt: { $gte: date } }),
        })
        .populate({
          path: "products.product",
        })
        .sort({ createdAt: -1 })
        .skip(pageIndex * pageSize)
        .limit(pageSize)
        .exec();
      const total = await this.orderModel.count();

      return { data: products, total };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async getProductById(id: MongooseSchema.Types.ObjectId) {
    let product;
    try {
      product = await this.orderModel
        .findById(id)
        .populate({
          path: "products.product",
        })
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(`Order not found:${id}. ${error}`);
    }

    if (!product) {
      throw new NotFoundException("The Order with this id does not exist");
    }

    return product;
  }

  async update(id: MongooseSchema.Types.ObjectId, body: OrderDto) {
    try {
      const post = await this.orderModel.findByIdAndUpdate({ _id: id }, body, {
        new: true,
      });

      if (!post) {
        throw new HttpException("Order not found", HttpStatus.BAD_REQUEST);
      }
      return post;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: MongooseSchema.Types.ObjectId) {
    try {
      const deletedPage = await this.orderModel
        .findByIdAndRemove({ _id: id })
        .exec();
      if (!deletedPage) {
        throw new HttpException("Order not found", HttpStatus.BAD_REQUEST);
      }
      return deletedPage;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
