export interface Category {
    id: string;
    name: string;
    description: string;
    updatedAt:string;
    createdAt:string;
  
  }

export interface PostCategory{
    name: string;
    description: string;
}


export interface responseCategory{
    status?: number;  
    message: string;    
    data?: null;        
    details?: string[];  
}

export interface ResponseCategoryList {
    totalElements: number;   
    totalPages: number;       
    size: number;             
    number: number;           
  }