import { IsNotEmpty, IsOptional } from "class-validator";

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

  @IsNotEmpty()
  currency: string;

  @IsNotEmpty()
  isActive: boolean;

  @IsOptional()
  quantity: number;

  @IsOptional()
  text: string;
}
