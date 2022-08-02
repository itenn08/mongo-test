import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class PageCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  parent?: string | null;

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
