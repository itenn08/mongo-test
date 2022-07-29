import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class PageDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsDateString()
  @IsOptional()
  date?: Date;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  seoTitle?: string;

  @IsString()
  @IsOptional()
  seoDescription?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
