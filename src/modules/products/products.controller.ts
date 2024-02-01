import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiTags } from '@nestjs/swagger';
import { Swagger } from 'src/common/swagger/decorators/swagger.decorator';
import { productsDocumentation } from './docs/products.doc';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Swagger(productsDocumentation.findAll)
  @Get()
  findAll(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
    @Query('search') search: string,
  ) {
    return this.productsService.findAll(limit, offset, search);
  }

  @Swagger(productsDocumentation.findBySlug)
  @Get('/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Swagger(productsDocumentation.findByCategory)
  @Get('/category/:category')
  findByCategory(
    @Param('category') category: string,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
  ) {
    return this.productsService.findByCategory(category, limit, offset);
  }
}
