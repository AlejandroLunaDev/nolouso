export type BackendUser = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: string;
    avatar: string;
    isPremium: boolean;
    documents: string[];
    last_connection: string;
  };
  
export type FrontendUser = {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    avatar: string;
    isPremium: boolean;
    documents: string[];
    lastConnection: string;
  };