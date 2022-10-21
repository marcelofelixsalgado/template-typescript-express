import { Sequelize } from "sequelize-typescript";
import Category from "../../../domain/category/entity/category";
import CategoryModel from "../../../infrastructure/category/repository/sequelize/category.model";
import CategoryRepository from "../../../infrastructure/category/repository/sequelize/category.repository";
import UpdateCategoryUseCase from "./update.category.usecase";

describe("Test update category use case", () => {
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

    it("should update a category", async () => {
        const categoryRepository = new CategoryRepository();
        const usecase = new UpdateCategoryUseCase(categoryRepository);

        const category = new Category("c256bd7c-3ed2-4220-a862-bb624af237f6", "Transporte", "TR", "Despesas com combustível e estacionamento", new Date, null);

        await categoryRepository.create(category);

        const input = {
            id: "c256bd7c-3ed2-4220-a862-bb624af237f6",
            name: "Updated category",
            code: "UP",
            description: "Updated description",
        }

        const result = await usecase.execute(input);

        expect(result).toEqual({
            id: input.id,
            name: input.name,
            code: input.code,
            description: input.description,
            createdAt: category.createdAt,
            updatedAt: expect.any(Date),
        });
    });
});
