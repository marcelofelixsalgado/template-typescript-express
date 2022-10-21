import { now } from "sequelize/types/utils";
import Category from "./category";

describe("Category unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            const category = new Category("", "Despesas Recorrentes", "DR", "Despesas mensais recorrentes", new Date(), null);
        }).toThrowError("category: Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            const category = new Category("5e8574ae-114e-4d4b-8622-9a2ff5a9d918", "", "DR", "Despesas mensais recorrentes", new Date(), null);
        }).toThrowError("category: Name is required");
    });

    it("should throw error when code is empty", () => {
        expect(() => {
            const category = new Category("5e8574ae-114e-4d4b-8622-9a2ff5a9d918", "Despesas Recorrentes", "", "Despesas mensais recorrentes", new Date(), null);
        }).toThrowError("category: Code is required");
    });

    it("should change name", () => {
        const category = new Category("5e8574ae-114e-4d4b-8622-9a2ff5a9d918", "Nome incorreto", "DR", "Despesas mensais recorrentes", new Date(), null);
        category.changeName("Despesas Recorrentes");
        expect(category.name).toBe("Despesas Recorrentes");
    });

    it("should change code", () => {
        const category = new Category("5e8574ae-114e-4d4b-8622-9a2ff5a9d918", "Despesas Recorrentes", "XX", "Despesas mensais recorrentes", new Date(), null);
        category.changeCode("DR");
        expect(category.code).toBe("DR");
    });
    
    it("should change name", () => {
        const category = new Category("5e8574ae-114e-4d4b-8622-9a2ff5a9d918", "Despesas Recorrentes", "DR", "Descricao incorreta", new Date(), null);
        category.changeDescription("Despesas mensais recorrentes");
        expect(category.description).toBe("Despesas mensais recorrentes");
    });    
});