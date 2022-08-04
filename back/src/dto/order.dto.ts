import { Type } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

export class OrderProductDto {
  @IsString()
  @IsNotEmpty()
  product: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: string;
}

export class OrderDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  number_phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  status:
    | "closed"
    | "processing"
    | "approved"
    | "pending"
    | "removed"
    | "open"
    | "complete"
    | "canceled";

  @IsString()
  @IsOptional()
  text?: string | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  @IsNotEmpty()
  products: OrderProductDto[];
}
