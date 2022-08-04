import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  url: string;

  @IsOptional()
  category: string;

  @IsOptional()
  seoTitle: string;

  @IsOptional()
  seoDescription: string;

  @IsOptional()
  photoUrl: string;

  @IsOptional()
  price: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(["$", "€"])
  currency: string;

  @IsNotEmpty()
  isActive: boolean;

  @IsOptional()
  quantity: number;

  @IsOptional()
  text: string;
}
