import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { ProductDto } from '../../products/dto';

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductDto)
  @ValidateNested({ each: true })
  products: ProductDto[];
}
