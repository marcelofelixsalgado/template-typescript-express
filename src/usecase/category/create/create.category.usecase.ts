import CategoryFactory from "../../../domain/category/factory/category.factory";
import CategoryRepositoryInterface from "../../../domain/category/repository/category-repository.interface";
import { InputCreateCategoryDto, OutputCreateCategoryDto } from "./create.category.dto";

export default class CreateCategoryUseCase {
    private categoryRepository: CategoryRepositoryInterface;

    constructor(categoryRepository: CategoryRepositoryInterface) {
        this.categoryRepository = categoryRepository;
    }

    async execute(input: InputCreateCategoryDto): Promise<OutputCreateCategoryDto> {
        const category = CategoryFactory.create(
            input.name,
            input.code,
            input.description,
        );

        await this.categoryRepository.create(category);

        return {
            id: category.id,
            name: category.name,
            code: category.code,
            description: category.description,
            createdAt: category.createdAt,
        };
    }
}