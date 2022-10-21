import CategoryRepositoryInterface from "../../../domain/category/repository/category-repository.interface";
import { InputDeleteCategoryDto, OutputDeleteCategoryDto } from "./delete.category.dto";

export default class DeleteCategoryUseCase {
    private categoryRepository: CategoryRepositoryInterface;

    constructor(categoryRepository: CategoryRepositoryInterface) {
        this.categoryRepository = categoryRepository;
    }

    async execute(input: InputDeleteCategoryDto): Promise<OutputDeleteCategoryDto> {

        await this.categoryRepository.delete(input.id);

        return {}
    }
}