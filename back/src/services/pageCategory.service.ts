import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PageCategoryDto } from "src/dto/pageCategory.dto";

import { PageCategory } from "src/interfaces/pageCategory.interface";

@Injectable()
export class PageCategoryService {
  constructor(
    @InjectModel("PageCategory") private pageCategoryModel: Model<PageCategory>
  ) {}

  async create(body: PageCategoryDto) {
    const category = new this.pageCategoryModel({
      name: body.name,
      parent: body.parent || "",
      order: body.order || 1,
      link: body.link,
    });

    try {
      await category.save();
      return { category: category._id };
    } catch (error) {
      throw error;
    }
  }

  async findAll(pageIndex: number, pageSize?: number) {
    try {
      const categories = await this.pageCategoryModel
        .find()
        .sort({ _id: 1 })
        .skip(pageIndex * pageSize)
        .limit(pageSize)
        .exec();

      const data = await categories.map((item) => {
        return {
          id: item._id,
          name: item.name,
          parent: item.parent,
          order: item.order,
          link: item.link,
        };
      });
      const total = await this.pageCategoryModel.count();

      return { data, page: pageIndex, total };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      return this.pageCategoryModel.findOne({ id }).exec();
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, postData: PageCategoryDto) {
    try {
      const post = await this.pageCategoryModel.findByIdAndUpdate(
        { _id: id },
        postData,
        {
          new: true,
        }
      );

      if (!post) {
        throw new HttpException("Category not found", HttpStatus.BAD_REQUEST);
      }
      return post;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string) {
    try {
      const deletedPage = await this.pageCategoryModel
        .findByIdAndRemove({ _id: id })
        .exec();
      if (!deletedPage) {
        throw new HttpException("Category not found", HttpStatus.BAD_REQUEST);
      }
      return deletedPage;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
