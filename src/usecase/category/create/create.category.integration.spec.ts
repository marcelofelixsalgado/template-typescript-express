import { Sequelize } from "sequelize-typescript";
import CategoryModel from "../../../infrastructure/category/repository/sequelize/category.model";
import CategoryRepository from "../../../infrastructure/category/repository/sequelize/category.repository";
import CreateCategoryUseCase from "./create.category.usecase";

describe("Test create category use case", () => {
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

    it("should create a category", async () => {
        const categoryRepository = new CategoryRepository();
        const usecase = new CreateCategoryUseCase(categoryRepository);

        const input = {
            name: "Alimentação",
            code: "AL",
            description: "Despesas com alimentação",
        }

        const result = await usecase.execute(input);

        expect(result).toEqual({
            id: expect.any(String),
            name: input.name,
            code: input.code,
            description: input.description,
            createdAt: expect.any(Date),
        });        
    });
});