export type Product = {
  productId?: string;
  slug: string;
  name: string;
  image: string;
  description: string;
  price: number;
  categoryId: number;
};

export type ProductCategory = {
  categoryId: number;
  name: string;
};
