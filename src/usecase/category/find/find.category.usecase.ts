import CategoryRepositoryInterface from "../../../domain/category/repository/category-repository.interface";
import { InputFindCategoryDto, OutputFindCategoryDto } from "./find.category.dto";

export default class FindCategoryUseCase {
    private categoryRepository: CategoryRepositoryInterface;

    constructor(categoryRepository: CategoryRepositoryInterface) {
        this.categoryRepository = categoryRepository;
    }

    async execute(input: InputFindCategoryDto): Promise<OutputFindCategoryDto> {
        const category = await this.categoryRepository.find(input.id);

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