import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { Express } from "express";
import { FileInterceptor } from "@nestjs/platform-express";

import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { PaginationParams } from "src/dto/pagination.dto";
import { FileService } from "src/services/file.service";

@Controller("file")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get("")
  async downloadFile(@Query() { query }: PaginationParams, @Res() res) {
    const file = await this.fileService.downloadFile(query);
    return res.status(HttpStatus.OK).json(file);
  }

  @UseGuards(JwtAuthGuard)
  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Query() { category }: { category: string },
    @Res() res
  ) {
    console.log("file", file);
    const path = await this.fileService.uploadFile(file, category);
    return res.status(HttpStatus.OK).json(path);
  }
}
