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

import { ProductDto } from "src/dto/products.dto";
import { Product } from "src/schemas/products.schema";

@Injectable()
export class ProductService {
  constructor(@InjectModel("Products") private productModel: Model<Product>) {}

  async create(body: ProductDto) {
    const product = new this.productModel({
      name: body.name,
      url: body.url || "",
      category: body.category || null,
      seoTitle: body.seoTitle || "",
      seoDescription: body.seoDescription || "",
      photoUrl: body.photoUrl || "",
      price: body.price || null,
      currency: body.currency || "$",
      isActive: body.isActive || false,
      quantity: body.quantity || null,
      text: body.text || "",
    });

    try {
      await product.save();
      return { product: product._id };
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
      const products = await this.productModel
        .find({
          ...(query && { name: { $regex: `${query}`, $options: "i" } }),
          ...(date && { createdAt: { $gte: date } }),
        })
        .populate("category")
        .sort({ createdAt: -1 })
        .skip(pageIndex * pageSize)
        .limit(pageSize)
        .exec();
      const total = await this.productModel.count();

      return { data: products, total };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async getProductById(id: MongooseSchema.Types.ObjectId) {
    let product;
    try {
      product = await this.productModel
        .findById(id)
        .populate("category")
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(
        `Product not found:${id}. ${error}`
      );
    }

    if (!product) {
      throw new NotFoundException("The client with this id does not exist");
    }

    return product;
  }

  async update(id: MongooseSchema.Types.ObjectId, postData: ProductDto) {
    try {
      const post = await this.productModel.findByIdAndUpdate(
        { _id: id },
        postData,
        {
          new: true,
        }
      );

      if (!post) {
        throw new HttpException("Product not found", HttpStatus.BAD_REQUEST);
      }
      return post;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: MongooseSchema.Types.ObjectId) {
    try {
      const deletedPage = await this.productModel
        .findByIdAndRemove({ _id: id })
        .exec();
      if (!deletedPage) {
        throw new HttpException("Product not found", HttpStatus.BAD_REQUEST);
      }
      return deletedPage;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
