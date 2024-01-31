import { ApiQuery, ApiParam } from '@nestjs/swagger';

// * Search options used for each product search filter (if returns more than one result)
const searchOptions = [
  ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Limit per product search (default 5)',
  }),
  ApiQuery({
    name: 'offset',
    type: Number,
    required: false,
    description: 'Page (default 1)',
  }),
];

// * Find all using search query or not
const findAll = [
  ...searchOptions,
  ApiQuery({
    name: 'search',
    required: false,
    type: Number,
    description: 'Search term (supports only product name)',
  }),
];

// * Unique result searched by slug (DB constraint)
const findBySlug = [
  ApiParam({
    name: 'slug',
    type: String,
    description:
      'Search by slug (unique friendly identificator separated by "-")',
  }),
];

// * Many results searched by category
const findByCategory = [
  ...searchOptions,
  ApiParam({
    name: 'category',
    type: String,
    description: 'Search by category (pizzas, extras, etc)',
  }),
];

export const productsDocumentation = {
  findAll,
  findBySlug,
  findByCategory,
};
