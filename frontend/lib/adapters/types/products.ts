export type BackendProduct = {
    title: string;
    description: string;
    price: number;
    thumbnails: string[];
    isPromoted: boolean;
    code: string;
    stock: number;
    category: string; // ID de la categoría
    status: boolean;
    owner: string;
    created_at: string;
    updated_at: string;
  };
  
  export type FrontendProduct = {
    title: string;
    description: string;
    price: number;
    thumbnails: string[];
    isPromoted: boolean;
    code: string;
    stock: number;
    category: string; // ID de la categoría
    status: boolean;
    owner: string;
    createdAt: string;
    updatedAt: string;
  };
  