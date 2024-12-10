export interface BackendProduct {
  _id: string;
  title: string;
  description: string;
  thumbnails: string[];
  price: number;
  likes: number;
  likedBy: string[];
  isPromoted: boolean;
  code: string;
  stock: number;
  category: string;
  status: boolean;
  owner: string;
}

export interface FrontendProduct {
  _id: string;
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  likes: number;
  isLiked: boolean;
}
  