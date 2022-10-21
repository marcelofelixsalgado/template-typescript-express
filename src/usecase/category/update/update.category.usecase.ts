import CategoryRepositoryInterface from "../../../domain/category/repository/category-repository.interface";
import { InputUpdateCategoryDto, OutputUpdateCategoryDto } from "./update.category.dto";

export default class UpdateCategoryUseCase {
    private categoryRepository: CategoryRepositoryInterface;

    constructor(categoryRepository: CategoryRepositoryInterface) {
        this.categoryRepository = categoryRepository;
    }

    async execute(input: InputUpdateCategoryDto): Promise<OutputUpdateCategoryDto> {
        const category = await this.categoryRepository.find(input.id);
        category.changeName(input.name);
        category.changeCode(input.code);
        category.changeDescription(input.description);
        category.changeUpdatedAt(new Date);

        await this.categoryRepository.update(category);

        return {
            id: category.id,
            name: category.name,
            code: category.code,
            description: category.description,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
        }
    }
}