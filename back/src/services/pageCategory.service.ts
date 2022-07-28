import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  PageCategoryDto,
  PageCategoryUpdateDto,
} from "src/dto/pageCategory.dto";

import { PageCategory } from "src/interfaces/pageCategory.interface";

@Injectable()
export class PageCategoryService {
  constructor(
    @InjectModel("PageCategory") private pageCategoryModel: Model<PageCategory>
  ) {}

  async create(body: PageCategoryDto) {
    const category = new this.pageCategoryModel({
      name: body.name,
      parent_id: body.parent_id || "",
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

  async updateAll(body: PageCategoryUpdateDto[]) {
    try {
      let uniqueCategories = new Set();

      body.forEach((item) => uniqueCategories.add(item));

      uniqueCategories.forEach((item: PageCategoryUpdateDto) =>
        this.update(item.id, item)
      );
      // body.forEach((item) => this.update(item.id, item));

      return "updated";
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const categories = await this.pageCategoryModel.find().exec();
      const buggedArray = [];

      // const findItem = (array: any, id) => {
      //   const childrenCategory = [];
      //   array.forEach((child) => {
      //     console.log("child", child);
      //     console.log("id", id);
      //     if (child.parent_id === id) {
      //       childrenCategory.push({
      //         id: child._id,
      //         name: child.name,
      //         parent_id: child.parent_id,
      //         order: child.order,
      //         link: child.link,
      //         type: child.type,
      //       });
      //     } else {
      //       buggedArray.push(child);
      //     }
      //   });

      //   console.log("childrenCategory", childrenCategory);
      //   return childrenCategory;
      // };

      // const data = await categories
      //   .filter((item) => !item.parent_id)
      //   .map((item) => {
      //     return {
      //       id: item._id,
      //       name: item.name,
      //       parent_id: item.parent_id,
      //       order: item.order,
      //       link: item.link,
      //       type: item.type,
      //       children: categories
      //         .filter((child) => child.parent_id === item._id.toString())
      //         .map((child) => {
      //           return {
      //             id: child._id,
      //             name: child.name,
      //             parent: child.parent_id,
      //             order: child.order,
      //             link: child.link,
      //             type: child.type,
      //           };
      //         }),

      const data = await categories
        .filter((item) => !item.parent_id)
        .map((item) => {
          return {
            id: item._id,
            name: item.name,
            parent_id: item.parent_id,
            order: item.order,
            link: item.link,
            type: "parent",
            children: categories
              .filter(
                (child) =>
                  child.parent_id === item._id.toString() &&
                  child.type === "link"
              )
              .map((child) => {
                return {
                  id: child._id,
                  name: child.name,
                  parent: child.parent_id,
                  order: child.order,
                  link: "link",
                  type: child.type,
                };
              }),

            // children: categories.map(
            //   (child) => {
            //     if (child.parent_id.includes(item._id.toString())) {
            //       return {
            // id: child._id,
            // name: child.name,
            // parent: child.parent_id,
            // order: child.order,
            // link: child.link,
            // type: child.type,
            //       };
            //     } else {
            //       if (child.type.includes("link")) {
            //         buggedArray.push({
            //           id: child._id,
            //           name: child.name,
            //           parent: child.parent_id,
            //           order: child.order,
            //           link: child.link,
            //           type: child.type,
            //         });
            //       }
            //       return null;
            //     }
            //   }

            // child.parent_id.includes(item._id.toString())
            // ? {
            //     id: child._id,
            //     name: child.name,
            //     parent: child.parent_id,
            //     order: child.order,
            //     link: child.link,
            //     type: child.type,
            //   }
            //   : child.type.includes("link") &&
            // buggedArray.push({
            //   id: child._id,
            //   name: child.name,
            //   parent: child.parent_id,
            //   order: child.order,
            //   link: child.link,
            //   type: child.type,
            // })

            // children: categories.map(
            //   (child) =>
            //     child.parent_id.includes(item._id.toString())
            //       ? {
            //           id: child._id,
            //           name: child.name,
            //           parent: child.parent_id,
            //           order: child.order,
            //           link: child.link,
            //           type: child.type,
            //         }
            //       : child.type.includes("link") &&
            //         buggedArray.push({
            //           id: child._id,
            //           name: child.name,
            //           parent: child.parent_id,
            //           order: child.order,
            //           link: child.link,
            //           type: child.type,
            //         })

            // children: categories.forEach(
            //   (child) => {
            //     if (child.parent_id.includes(item._id.toString())) {
            //       console.log("includes");
            //       return {
            //         id: child._id,
            //         name: child.name,
            //         parent: child.parent_id,
            //         order: child.order,
            //         link: child.link,
            //         type: child.type,
            //         test: "asd",
            //       };
            //     } else {
            //       if (child.type.includes("link")) {
            //         buggedArray.push({
            //           id: child._id,
            //           name: child.name,
            //           parent: child.parent_id,
            //           order: child.order,
            //           link: child.link,
            //           type: child.type,
            //         });
            //       }
            //     }
            //   }

            // children: categories.map((child) =>
            //   child.parent_id.includes(item._id.toString())
            //     ? {
            //         id: child._id,
            //         name: child.name,
            //         parent: child.parent_id,
            //         order: child.order,
            //         link: child.link,
            //         type: child.type,
            //       }
            //     : child.type.includes("link") &&
            //       buggedArray.push({
            //         id: child._id,
            //         name: child.name,
            //         parent: child.parent_id,
            //         order: child.order,
            //         link: child.link,
            //         type: child.type,
            //       })
            // ),
          };
        });

      // const result = [...data, ...buggedArray];

      // const data = await categories
      //   .filter((item) => !item.parent_id)
      //   .map((item) => {
      //     return {
      //       id: item._id,
      //       name: item.name,
      //       parent: item.parent_id,
      //       order: item.order,
      //       link: item.link,
      //       type: item.type,
      // children: categories
      //   .filter((child) => child.parent_id === item._id.toString())
      //   .map((child) => {
      // return {
      //   id: child._id,
      //   name: child.name,
      //   parent: child.parent_id,
      //   order: child.order,
      //   link: child.link,
      //   type: child.type,
      // };
      //   }),
      //     };
      //   });

      const total = await this.pageCategoryModel.count();

      return { data, total };
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
