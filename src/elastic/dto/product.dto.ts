import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  categories: string[];

  @IsNotEmpty()
  @IsString()
  description: string;
}
