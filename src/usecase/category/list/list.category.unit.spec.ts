import CategoryFactory from "../../../domain/category/factory/category.factory";
import ListCategoryUseCase from "./list.category.usecase";

const category1 = CategoryFactory.create("Alimentação", "AL", "Despesas com alimentação");
const category2 = CategoryFactory.create("Transporte", "TR", "Despesas com combustível e estacionamento");

const MockRepository = () => {
    return {
      create: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn().mockReturnValue(Promise.resolve([category1, category2])),
      delete: jest.fn(),
    };
};

describe("Unit test for listing category use case", () => {

    it("should list categories", async () => {
        const categoryRepository = MockRepository();
        const usecase = new ListCategoryUseCase(categoryRepository);

        const output = await usecase.execute({});

        expect(output.categories.length).toBe(2);
        expect(output.categories[0].id).toBe(category1.id);
        expect(output.categories[0].name).toBe(category1.name);
        expect(output.categories[0].code).toBe(category1.code);
        expect(output.categories[0].description).toBe(category1.description);
        expect(output.categories[1].id).toBe(category2.id);
        expect(output.categories[1].name).toBe(category2.name);
        expect(output.categories[1].code).toBe(category2.code);
        expect(output.categories[1].description).toBe(category2.description);
    })

});