import { IsString, IsNumber } from 'class-validator';

export class ProductDto {
  @IsString()
  id: string;
  @IsNumber()
  quantity: number;
}
