import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query('limit') limit: string, @Query('offset') offset: string) {
    return this.productsService.findAll(limit, offset);
  }

  @Get('/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Get('/category/:category')
  findByCategory(
    @Param('category') category: string,
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    return this.productsService.findByCategory(category, limit, offset);
  }
}
