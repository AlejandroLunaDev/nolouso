interface CookieOptions {
  expires?: Date;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
}

export const cookieService = {
  get: (name: string): string | undefined => {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(`${name}=`))
      ?.split('=')[1];
  },

  set: (name: string, value: string, options: CookieOptions = {}) => {
    let cookie = `${name}=${value}`;
    
    if (options.expires) {
      cookie += `; expires=${options.expires.toUTCString()}`;
    }
    if (options.path) {
      cookie += `; path=${options.path}`;
    }
    if (options.secure) {
      cookie += '; secure';
    }
    if (options.httpOnly) {
      cookie += '; httpOnly';
    }
    
    document.cookie = cookie;
  },

  remove: (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}; 