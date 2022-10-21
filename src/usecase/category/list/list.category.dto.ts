export interface InputListCategoryDto {}

type Category = {
    id: string;
    name: string;
    code: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;    
}

export interface OutputListCategoryDto {
    categories: Category[];
}