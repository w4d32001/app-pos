export interface responseAPI{
    status?: number;  
    message: string;    
    data?: null;        
    details?: string[];  
}

export interface responseList{
    totalElements: number;   
    totalPages: number;       
    size: number;             
    number: number;           
  }