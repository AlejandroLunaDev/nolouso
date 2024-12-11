export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string | null;
  }
  
  export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
  }
  
  export interface LoginResponse {
    user: User;
    token: string;
  }
  
  export interface RegisterResponse {
    user: User;
  } 