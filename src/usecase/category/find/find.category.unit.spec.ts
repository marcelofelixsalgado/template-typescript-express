import Category from "../../../domain/category/entity/category";
import FindCategoryUseCase from "./find.category.usecase";

const createdAt = new Date();
const updatedAt = new Date();
const category = new Category("c6d9146e-7da1-4844-ab5a-3e0d19f3acba", "Alimentação", "AL", "Despesas com alimentação", createdAt, updatedAt);

const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(category)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
};

describe("Unit test find category use case", () => {

    it("should find a category", async () => {
        const categoryRepository = MockRepository();
        const usecase = new FindCategoryUseCase(categoryRepository);

        const input = {
            id: "c6d9146e-7da1-4844-ab5a-3e0d19f3acba",
        }

        const output = {
            id: "c6d9146e-7da1-4844-ab5a-3e0d19f3acba",
            name: "Alimentação",
            code: "AL",
            description: "Despesas com alimentação",
            createdAt: createdAt, 
            updatedAt: updatedAt,
        };

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });

    it("should not find a category", async () => {
        const categoryRepository = MockRepository();
        categoryRepository.find.mockImplementation(() => {
            throw new Error("Category not found");
        });

        const usecase = new FindCategoryUseCase(categoryRepository);

        const input = {
            id: "123",
        }

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Category not found");
    });
});