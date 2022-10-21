export interface InputFindCategoryDto {
    id: string;
}

export interface OutputFindCategoryDto {
    id: string;
    name: string;
    code: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;    
}