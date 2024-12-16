export interface ShopFilters {
  search: string;
  category: string;
  price: {
    min: number;
    max: number;
  };
  sort: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';
  location: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  location: string;
  imageUrl: string;
  seller: {
    id: string;
    name: string;
    rating: number;
  };
  status?: boolean;
  stock?: number;
  createdAt?: string;
} 