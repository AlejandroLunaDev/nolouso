import { BackendProduct, FrontendProduct } from "../types/products";

export const productAdapter = (product: BackendProduct, userId?: string): FrontendProduct => {
  return {
    id: product._id,
    title: product.title,
    description: product.description,
    image: product.thumbnails[0] || '',
    price: product.price,
    likes: product.likes,
    isLiked: userId ? product.likedBy.includes(userId) : false,
  };
};
