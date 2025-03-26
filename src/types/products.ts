export interface ProductItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
  rating: ProductRating;
  is_favorite: boolean
  [key: string]: any
}

export interface ProductRating {
  count: number;
  rate: number;
}

export interface ProductForm {
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
}