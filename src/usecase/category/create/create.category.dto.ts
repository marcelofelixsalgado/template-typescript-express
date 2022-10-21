export interface InputCreateCategoryDto {
    name: string;
    code: string;
    description: string;
}

export interface OutputCreateCategoryDto {
    id: string;
    name: string;
    code: string;
    description: string;
    createdAt: Date;
}