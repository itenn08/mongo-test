import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: "Password is too short (8 characters min)" })
  @MaxLength(20, { message: "Password is too long (20 characters max)" })
  password: string;
}

export class UserUpdateDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  role?: string;
}
