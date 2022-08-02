import { Schema as MongooseSchema } from "mongoose";
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

import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { PageDto } from "src/dto/page.dto";
import { PageService } from "src/services/page.service";
import { PaginationParams } from "src/dto/pagination.dto";
import { Response } from "express";

@Controller("page")
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @UseGuards(JwtAuthGuard)
  @Get("")
  async findAll(@Query() { pageIndex, pageSize, query }: PaginationParams) {
    return await this.pageService.findAll(pageIndex, pageSize, query);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body(ValidationPipe) body: PageDto) {
    return await this.pageService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async findOne(
    @Param("id") id: MongooseSchema.Types.ObjectId,
    @Res() res: Response
  ) {
    const storage: any = await this.pageService.findOne(id);
    return res.status(HttpStatus.OK).send(storage);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async updatePost(
    @Param("id") id: MongooseSchema.Types.ObjectId,
    @Body() body: PageDto
  ) {
    return this.pageService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async delete(@Param("id") id: MongooseSchema.Types.ObjectId) {
    return this.pageService.delete(id);
  }
}
