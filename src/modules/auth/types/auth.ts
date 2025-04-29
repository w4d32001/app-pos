export interface LoginResponse {
    status:number;
    message:string;
    data: {
      userName: string;
      token: string;
    };
    details?: string[];
  }
  
  export interface LoginRequest {
    userName: string;
    password: string;
  }
  