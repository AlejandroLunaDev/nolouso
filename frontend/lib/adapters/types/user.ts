export interface BackendUser {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  avatar: string;
  isPremium: boolean;
  documents: any[];
  last_connection: Date;
}

export interface FrontendUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar: string;
  isPremium: boolean;
  documents: any[];
  lastConnection: Date;
}