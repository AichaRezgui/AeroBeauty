export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  images: string[];
  rating?: number;
  reviews?: number[];
  stock?: number ;
  isFeatured?: boolean;
  isNew?: boolean;
}
