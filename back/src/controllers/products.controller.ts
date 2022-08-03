import { ProductDto } from "./../dto/products.dto";
import { ProductService } from "./../services/products.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { Schema as MongooseSchema } from "mongoose";

import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { Response } from "express";
import { PaginationParams } from "src/dto/pagination.dto";

@Controller("products")
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Get("")
  async getAll(
    @Query() { pageIndex, pageSize, query, date }: PaginationParams,
    @Res() res
  ) {
    const customers = await this.productService.findAll(
      pageIndex,
      pageSize,
      query,
      date
    );
    return res.status(HttpStatus.OK).json(customers);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body(ValidationPipe) body: ProductDto) {
    return await this.productService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async getProductById(
    @Param("id") id: MongooseSchema.Types.ObjectId,
    @Res() res: Response
  ) {
    const storage: any = await this.productService.getProductById(id);
    return res.status(HttpStatus.OK).send(storage);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async updatePost(
    @Param("id") id: MongooseSchema.Types.ObjectId,
    @Body() body: ProductDto
  ) {
    return this.productService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async delete(@Param("id") id: MongooseSchema.Types.ObjectId) {
    return this.productService.delete(id);
  }
}
