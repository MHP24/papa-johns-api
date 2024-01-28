import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { ProductDto } from '../../products/dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ type: () => [ProductDto] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductDto)
  @ValidateNested({ each: true })
  products: ProductDto[];
}
