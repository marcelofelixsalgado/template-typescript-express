import { Sequelize } from "sequelize-typescript";
import Category from "../../../domain/category/entity/category";
import CategoryModel from "../../../infrastructure/category/repository/sequelize/category.model";
import CategoryRepository from "../../../infrastructure/category/repository/sequelize/category.repository";
import ListCategoryUseCase from "./list.category.usecase";

describe("Test list category use case", () => {
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

    it("should list categories", async () => {
        const categoryRepository = new CategoryRepository();
        const usecase = new ListCategoryUseCase(categoryRepository);

        const category1 = new Category("ae6ede77-6137-4ee1-ae11-c40d489694b7", "Alimentação", "AL", "Despesas com alimentação", new Date, null);
        await categoryRepository.create(category1);

        const category2 = new Category("c256bd7c-3ed2-4220-a862-bb624af237f6", "Transporte", "TR", "Despesas com combustível e estacionamento", new Date, null);
        await categoryRepository.create(category2);

        const result = await usecase.execute({});

        expect(result.categories.length).toBe(2);
        expect(result.categories[0]).toEqual({
            id: category1.id,
            name: category1.name,
            code: category1.code,
            description: category1.description,
            createdAt: category1.createdAt,
            updatedAt: null,
        });
        expect(result.categories[1]).toEqual({
            id: category2.id,
            name: category2.name,
            code: category2.code,
            description: category2.description,
            createdAt: category2.createdAt,
            updatedAt: null,
        });        
    });
});