import Category from "../../../domain/category/entity/category";
import FindCategoryUseCase from "../find/find.category.usecase";
import DeleteCategoryUseCase from "./delete.category.usecase";

const createdAt = new Date();
const updatedAt = new Date();

const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
};

describe("Unit test delete category use case", () => {

    it("should delete a category", async () => {
        const categoryRepository = MockRepository();
        const usecase = new DeleteCategoryUseCase(categoryRepository);

        const input = {
            id: "c6d9146e-7da1-4844-ab5a-3e0d19f3acba",
        }

        const output = {};

        const result = await usecase.execute(input);

        expect(result).toEqual(output);        
    });

});