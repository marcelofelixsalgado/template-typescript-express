export interface InputUpdateCategoryDto {
    id: string;
    name: string;
    code: string;
    description: string; 
}

export interface OutputUpdateCategoryDto {
    id: string;
    name: string;
    code: string;
    description: string; 
    createdAt: Date;
    updatedAt: Date;
}