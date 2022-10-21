import CategoryFactory from "../../../domain/category/factory/category.factory";
import UpdateCategoryUseCase from "./update.category.usecase";

const category = CategoryFactory.create("Alimentação", "AL", "Despesas com alimentação");

const input = {
    id: category.id,
    name: "Alimentação updated",
    code: "UP",
    description: "Despesas com alimentação updated"
};

const MockRepository = () => {
    return {
      create: jest.fn(),
      findAll: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(category)),
      update: jest.fn(),
      delete: jest.fn(),
    };
  };

  describe("Unit test for category update use case", () => {
    it("should update a category", async () => {
        const categoryRepository = MockRepository();
        const categoryUpdateUseCase = new UpdateCategoryUseCase(categoryRepository);

        const output = await categoryUpdateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            code: input.code,
            description: input.description,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });
  });