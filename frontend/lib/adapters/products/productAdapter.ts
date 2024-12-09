import { BackendProduct, FrontendProduct } from "../types/products";

export const productAdapter = (backendProduct: BackendProduct): FrontendProduct => {
  return {
    title: backendProduct.title,
    description: backendProduct.description,
    price: backendProduct.price,
    thumbnails: backendProduct.thumbnails,
    isPromoted: backendProduct.isPromoted,
    code: backendProduct.code,
    stock: backendProduct.stock,
    category: backendProduct.category,
    status: backendProduct.status,
    owner: backendProduct.owner,
    createdAt: backendProduct.created_at,
    updatedAt: backendProduct.updated_at,
  };
};
