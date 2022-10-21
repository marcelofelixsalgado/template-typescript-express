import Category from "../../../../domain/category/entity/category";
import CategoryRepositoryInterface from "../../../../domain/category/repository/category-repository.interface";
import CategoryModel from "./category.model";

export default class CategoryRepository implements CategoryRepositoryInterface {

    async create(entity: Category): Promise<void> {
        await CategoryModel.create({
            id: entity.id,
            name: entity.name,
            code: entity.code,
            description: entity.description,
            createdAt: entity.createdAt,
        });
    }

    async update(entity: Category): Promise<void> {
        await CategoryModel.update({
            id: entity.id,
            name: entity.name,
            code: entity.code,
            description: entity.description,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        },
        {
            where: {
                id: entity.id,
            }
        });
    }

    async find(id: string): Promise<Category> {
        let categoryModel;
        try {
            categoryModel = await CategoryModel.findOne({
                where: {
                    id,
                },
                rejectOnEmpty: true,
            });
        } catch(error) {
            throw new Error("Category not found");
        }

        return new Category(id, categoryModel.name, categoryModel.code, categoryModel.description, categoryModel.createdAt, categoryModel.updatedAt);
    }

    async findAll(): Promise<Category[]> {
        const categoryModels = await CategoryModel.findAll();

        const categories = categoryModels.map((categoryModels) => {
            return new Category(categoryModels.id, categoryModels.name, categoryModels.code, categoryModels.description, categoryModels.createdAt, categoryModels.updatedAt);
        });
        
        return categories;
    }

    async delete(id: string): Promise<void> {
        let categoryModel;
        try {
            categoryModel = await CategoryModel.destroy({
                where: {
                    id,
                }
            });
        } catch(error) {
            throw new Error("Error on delete Category");
        }
    }    

}