import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Page } from "src/interfaces/page.interface";
import { PageDto } from "src/dto/page.dto";

@Injectable()
export class PageService {
  constructor(@InjectModel("Page") private pageModel: Model<Page>) {}

  async create(body: PageDto) {
    const page = new this.pageModel({
      title: body.title,
      content: body.content,
      date: body.date || new Date(),
      isActive: body.isActive,
      seoDescription: body.seoDescription,
      seoTitle: body.seoTitle,
      url: body.url,
    });

    try {
      await page.save();
      return { page: page._id };
    } catch (error) {
      throw error;
    }
  }

  async findAll(pageIndex: number, pageSize?: number) {
    try {
      const pages = await this.pageModel
        .find()
        .sort({ _id: 1 })
        .skip(pageIndex * pageSize)
        .limit(pageSize)
        .exec();

      const data = await pages.map((item) => {
        return {
          id: item._id,
          title: item.title,
          seoTitle: item.seoTitle,
          seoDescription: item.seoDescription,
          date: item.date,
          content: item.content,
          url: item.url,
          isActive: item.isActive,
        };
      });
      const total = await this.pageModel.count();

      return { data, page: pageIndex, total };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      return this.pageModel.findOne({ id }).exec();
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, postData: PageDto) {
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

  async delete(id: string) {
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
