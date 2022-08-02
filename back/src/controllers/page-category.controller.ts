import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { Schema as MongooseSchema } from "mongoose";

import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import {
  PageCategoryDto,
  PageCategoryUpdateDto,
} from "src/dto/page-category.dto";
import { PaginationParams } from "src/dto/pagination.dto";
import { PageCategoryService } from "src/services/page-category.service";

@Controller("category")
export class PageCategoryController {
  constructor(private readonly pageCategoryService: PageCategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Get("")
  async findAll(@Query() { pageIndex, pageSize }: PaginationParams) {
    return await this.pageCategoryService.findAll(pageIndex, pageSize);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/search")
  async searchByName(
    @Query() { pageIndex, pageSize, query, type }: PaginationParams
  ) {
    return await this.pageCategoryService.findByFilter(
      pageIndex,
      pageSize,
      query,
      type
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body(ValidationPipe) body: PageCategoryDto) {
    return await this.pageCategoryService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async findOne(@Param("id") id: MongooseSchema.Types.ObjectId) {
    return this.pageCategoryService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async updatePost(
    @Param("id") id: MongooseSchema.Types.ObjectId,
    @Body() body: PageCategoryDto
  ) {
    return this.pageCategoryService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async delete(@Param("id") id: MongooseSchema.Types.ObjectId) {
    return this.pageCategoryService.delete(id);
  }
}
