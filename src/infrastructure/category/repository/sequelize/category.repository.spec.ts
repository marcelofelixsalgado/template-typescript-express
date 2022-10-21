import { Sequelize } from "sequelize-typescript";
import Category from "../../../../domain/category/entity/category";
import CategoryModel from "./category.model";
import CategoryRepository from "./category.repository";

describe("Category repository test", () => {
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
        const category = new Category("123", "Despesas recorrentes", "DR", "Despesas mensais recorrentes", new Date(), null);
        await categoryRepository.create(category);

        const categoryModel = await CategoryModel.findOne({ where: { id: "123" } });

        expect(categoryModel.toJSON()).toStrictEqual({
            id: "123",
            name: category.name,
            code: category.code,
            description: category.description,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
        });
    });

    it("should update a category", async () => {
        let updatedAt = new Date();

        const categoryRepository = new CategoryRepository();
        const category = new Category("123", "Nome incorreto", "DR", "Despesas mensais recorrentes", new Date(), updatedAt);
        await categoryRepository.create(category);

        category.changeName("Despesas recorrentes");

        await categoryRepository.update(category);

        const categoryModel = await CategoryModel.findOne({ where: { id: "123" } });

        expect(categoryModel.toJSON()).toStrictEqual({
            id: "123",
            name: category.name,
            code: category.code,
            description: category.description,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
        });        
    });

    it("should find a category", async () => {
        const categoryRepository = new CategoryRepository();
        const category = new Category("123", "Despesas recorrentes", "DR", "Despesas mensais recorrentes", new Date(), null);
        await categoryRepository.create(category);

        const categoryResult = await categoryRepository.find(category.id);

        expect(category).toStrictEqual(categoryResult);
    });

    it("should throw an error when a category is not found", async () => {
        const categoryRepository = new CategoryRepository();

        expect(async () => {
            await categoryRepository.find("456");
        }).rejects.toThrow("Category not found");
    });

    it("should find all categories", async () => {
        const categoryRepository = new CategoryRepository();
        const categoryDR = new Category("123", "Despesas recorrentes", "DR", "Despesas mensais recorrentes", new Date(), null);
        await categoryRepository.create(categoryDR);

        const categoryDV = new Category("456", "Despesas variáveis", "DV", "Despesas mensais variáveis", new Date(), null);
        await categoryRepository.create(categoryDV);

        const categories = await categoryRepository.findAll();

        expect(categories).toHaveLength(2);
        expect(categories).toContainEqual(categoryDR);
        expect(categories).toContainEqual(categoryDV);
    });    

});