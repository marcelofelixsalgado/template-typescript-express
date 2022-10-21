import ValidatorInterface from "../../@shared/validator/validator.interface";
import CategoryFixed from "../entity/category";
import CategoryYupValidator from "../validator/category.yup.validator";

export default class CategoryValidatorFactory {
    static create(): ValidatorInterface<CategoryFixed> {
        return new CategoryYupValidator();
    }
}