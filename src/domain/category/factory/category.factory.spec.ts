import CategoryFactory from "./category.factory";

describe("Category factory unit test", () => {

    it("should create a category", () => {
        let category = CategoryFactory.create("Despesas Recorrentes", "DR", "Despesas mensais recorrentes");
        expect(category.id).toBeDefined();
        expect(category.name).toBe("Despesas Recorrentes");
        expect(category.code).toBe("DR");
        expect(category.description).toBe("Despesas mensais recorrentes");
    });
});