import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Schema as MongooseSchema } from "mongoose";

import { PageDto } from "src/dto/page.dto";
import { Page } from "src/schemas/page.schema";

@Injectable()
export class PageService {
  constructor(@InjectModel("Page") private pageModel: Model<Page>) {}

  async create(body: PageDto) {
    const page = new this.pageModel({
      title: body.title,
      content: body.content,
      isActive: body.isActive,
      seoDescription: body.seoDescription,
      seoTitle: body.seoTitle,
      url: body.url,
      category: body.category || null,
    });

    try {
      await page.save();
      return { page: page._id };
    } catch (error) {
      throw error;
    }
  }

  async findAll(pageIndex: number, pageSize?: number, query?: string) {
    try {
      const pages = await this.pageModel
        .find({
          ...(query && { title: { $regex: `${query}`, $options: "i" } }),
        })
        .populate("category")
        .sort({ _id: 1 })
        .skip(pageIndex * pageSize)
        .limit(pageSize)
        .exec();

      const total = await this.pageModel.count();

      return { data: pages, page: pageIndex, total };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: MongooseSchema.Types.ObjectId) {
    try {
      return this.pageModel.findById(id).populate("category").exec();
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: MongooseSchema.Types.ObjectId, postData: PageDto) {
    try {
      const post = await this.pageModel.findByIdAndUpdate(
        { _id: id },
        postData,
        {
          new: true,
        }
      );

      if (!post) {
        throw new HttpException("Page not found", HttpStatus.BAD_REQUEST);
      }
      return post;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: MongooseSchema.Types.ObjectId) {
    try {
      const deletedPage = await this.pageModel
        .findByIdAndRemove({ _id: id })
        .exec();
      if (!deletedPage) {
        throw new HttpException("Page not found", HttpStatus.BAD_REQUEST);
      }
      return deletedPage;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
