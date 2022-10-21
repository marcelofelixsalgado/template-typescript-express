import Category from "../../../domain/category/entity/category";
import CategoryRepositoryInterface from "../../../domain/category/repository/category-repository.interface";
import { InputListCategoryDto, OutputListCategoryDto } from "./list.category.dto";

export default class ListCategoryUseCase {
    private categoryRepository: CategoryRepositoryInterface;

    constructor(categoryRepository: CategoryRepositoryInterface) {
        this.categoryRepository = categoryRepository;
    }

    async execute(input: InputListCategoryDto): Promise<OutputListCategoryDto> {
        const categories = await this.categoryRepository.findAll();
        return OutputMapper.toOutput(categories);
    }
}

class OutputMapper {
    static toOutput(category: Category[]): OutputListCategoryDto {
      return {
        categories: category.map((category) => ({
          id: category.id,
          name: category.name,
          code: category.code,
          description: category.description,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
        })),
      };
    }
  }