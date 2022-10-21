import { CreatedAt } from "sequelize-typescript";
import CreateCategoryUseCase from "./create.category.usecase";

const input = {
    name: "Alimentação",
    code: "AL",
    description: "Despesas com alimentação",
}

const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
  };

  describe("Unit test create category use case", () => {
    it("should create a category", async () => {
        const categoryRepository = MockRepository();
        const categoryCreateUseCase = new CreateCategoryUseCase(categoryRepository);


        const output = await categoryCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            code: input.code,
            description: input.description,
            createdAt: expect.any(Date),
        });
    });

    it("should throw an error when name is missing", async () => {
        const categoryRepository = MockRepository();
        const categoryCreateUseCase = new CreateCategoryUseCase(categoryRepository);

        input.name = "";

        await expect(categoryCreateUseCase.execute(input)).rejects.toThrow("category: Name is required");
    });

    it("should throw an error when code is missing", async () => {
        const categoryRepository = MockRepository();
        const categoryCreateUseCase = new CreateCategoryUseCase(categoryRepository);

        input.code = "";

        await expect(categoryCreateUseCase.execute(input)).rejects.toThrow("category: Code is required");
    });

    it("should throw an error when description is missing", async () => {
        const categoryRepository = MockRepository();
        const categoryCreateUseCase = new CreateCategoryUseCase(categoryRepository);

        input.description = "";

        await expect(categoryCreateUseCase.execute(input)).rejects.toThrow("category: Description is required");
    });    
  });