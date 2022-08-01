import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";

import { PageCategoryView } from "src/interfaces/pageCategory.interface";

export class PageCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  @IsOptional()
  parent: PageCategoryView | null;

  @IsString()
  @IsNotEmpty()
  link: string;

  @IsString()
  @IsNotEmpty()
  type: "parent" | "link";

  @IsNumber()
  @IsOptional()
  order?: number;
}

export class PageCategoryUpdateDto extends PageCategoryDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
