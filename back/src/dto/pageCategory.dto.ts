import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class PageCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  parent: string;

  @IsString()
  @IsNotEmpty()
  link: string;

  @IsString()
  @IsOptional()
  order?: number;
}
