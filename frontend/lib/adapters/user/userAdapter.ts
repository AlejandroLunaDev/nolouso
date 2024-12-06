import { BackendUser, FrontendUser } from "../types/user";

  
  export const userAdapter = (backendUser: BackendUser): FrontendUser => {
    return {
      firstName: backendUser.first_name,
      lastName: backendUser.last_name,
      email: backendUser.email,
      role: backendUser.role,
      avatar: backendUser.avatar,
      isPremium: backendUser.isPremium,
      documents: backendUser.documents,
      lastConnection: backendUser.last_connection,
    };
  };
  