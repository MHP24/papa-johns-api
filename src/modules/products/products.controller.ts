import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  findAll(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
    @Query('search') search: string,
  ) {
    return this.productsService.findAll(limit, offset, search);
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
