import { v4 as uuid } from "uuid";
import Category from "../entity/category";

export default class CategoryFactory {
    public static create(name: string, code: string, description: string) {
        return new Category(uuid(), name, code, description, new Date(), null);
    }
}