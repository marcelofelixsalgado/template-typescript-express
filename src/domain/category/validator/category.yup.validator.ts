import * as yup from "yup";
import ValidatorInterface from "../../@shared/validator/validator.interface";
import Category from "../entity/category";

export default class CategoryYupValidator implements ValidatorInterface<Category>
{
  validate(entity: Category): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
          code: yup.string().required("Code is required"),
          description: yup.string().required("Description is required"),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            code: entity.code,
            description: entity.description,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "category",
          message: error,
        });
      });
    }
  }
}