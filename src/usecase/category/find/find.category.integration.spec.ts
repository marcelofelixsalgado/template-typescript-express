import { Sequelize } from "sequelize-typescript";
import Category from "../../../domain/category/entity/category";
import CategoryModel from "../../../infrastructure/category/repository/sequelize/category.model";
import CategoryRepository from "../../../infrastructure/category/repository/sequelize/category.repository";
import FindCategoryUseCase from "./find.category.usecase";

describe("Test find category use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },            
        });

        await sequelize.addModels([CategoryModel]);
        await sequelize.sync();    
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a category", async () => {
        const categoryRepository = new CategoryRepository();
        const usecase = new FindCategoryUseCase(categoryRepository);

        const category = new Category("ae6ede77-6137-4ee1-ae11-c40d489694b7", "Alimentação", "AL", "Despesas com alimentação", new Date, null);
        await categoryRepository.create(category);

        const input = {
            id: "ae6ede77-6137-4ee1-ae11-c40d489694b7",
        }

        const result = await usecase.execute(input);

        expect(result).toEqual({
            id: category.id,
            name: category.name,
            code: category.code,
            description: category.description,
            createdAt: category.createdAt,
            updatedAt: null,
        });        
    });
});