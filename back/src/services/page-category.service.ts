import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Schema as MongooseSchema } from "mongoose";

import { PageCategoryDto } from "src/dto/page-category.dto";
import { PageCategory } from "src/schemas/page-category.schema";

@Injectable()
export class PageCategoryService {
  constructor(
    @InjectModel("PageCategory") private pageCategoryModel: Model<PageCategory>
  ) {}

  async create(body: PageCategoryDto) {
    const category = new this.pageCategoryModel({
      name: body.name,
      parent: body.parent || null,
      order: body.order || 1,
      link: body.link,
      type: body.type || "link",
    });

    try {
      await category.save();
      return { category: category._id };
    } catch (error) {
      throw error;
    }
  }

  async findByFilter(
    pageIndex?: number,
    pageSize?: number,
    query?: string,
    type?: string
  ) {
    try {
      let categories;
      if (type) {
        categories = await this.pageCategoryModel
          .find()
          .where({
            "LOWER(name)": new RegExp(`^${query}`),
            parent: type === "parent" && null,
          })
          .sort({ _id: 1 })
          .skip(pageIndex * pageSize)
          .limit(pageSize)
          .exec();
      } else {
        categories = await this.pageCategoryModel
          .find()
          .where({
            "LOWER(name)": new RegExp(`^${query}`),
          })
          .sort({ _id: 1 })
          .skip(pageIndex * pageSize)
          .limit(pageSize)
          .exec();
      }

      const data = await categories.map((item) => {
        return {
          id: item._id,
          name: item.name,
          parent: item.parent,
          order: item.order,
          link: item.link,
          type: "parent",
        };
      });

      const total = await this.pageCategoryModel.count();

      return { data, total };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(pageIndex?: number, pageSize?: number) {
    try {
      const categories = await this.pageCategoryModel
        .find()
        .sort({ _id: 1 })
        .skip(pageIndex * pageSize)
        .limit(pageSize)
        .exec();

      const data = await categories
        .filter((item) => item.parent === null)
        .map((item) => {
          return {
            id: item._id,
            name: item.name,
            parent: item.parent,
            order: item.order,
            link: item.link,
            type: "parent",
            children: categories
              .filter(
                (child: PageCategory) =>
                  child.parent !== null &&
                  child.parent &&
                  child.parent === item._id.toString()
              )
              .map((child) => {
                return {
                  id: child._id,
                  name: child.name,
                  parent: child.parent,
                  order: child.order,
                  link: "link",
                  type: child.type,
                };
              }),
          };
        });

      const total = await this.pageCategoryModel.count();

      return { data, total };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: MongooseSchema.Types.ObjectId) {
    try {
      return this.pageCategoryModel.findOne({ _id: id }).exec();
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: MongooseSchema.Types.ObjectId, postData: PageCategoryDto) {
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

  async delete(id: MongooseSchema.Types.ObjectId) {
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
