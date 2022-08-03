import { OrderDto } from "./../dto/order.dto";
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
import { OrderService } from "src/services/order.service";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Get("")
  async getAll(
    @Query() { pageIndex, pageSize, query, date }: PaginationParams,
    @Res() res
  ) {
    const customers = await this.orderService.findAll(
      pageIndex,
      pageSize,
      query,
      date
    );
    return res.status(HttpStatus.OK).json(customers);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body(ValidationPipe) body: OrderDto) {
    return await this.orderService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async getProductById(
    @Param("id") id: MongooseSchema.Types.ObjectId,
    @Res() res: Response
  ) {
    const storage: any = await this.orderService.getProductById(id);
    return res.status(HttpStatus.OK).send(storage);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async updatePost(
    @Param("id") id: MongooseSchema.Types.ObjectId,
    @Body() body: OrderDto
  ) {
    return this.orderService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async delete(@Param("id") id: MongooseSchema.Types.ObjectId) {
    return this.orderService.delete(id);
  }
}
