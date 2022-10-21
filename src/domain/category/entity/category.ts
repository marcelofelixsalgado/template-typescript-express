import Entity from "../../@shared/entity/entity.abstract"
import NotificationError from "../../@shared/notification/notification.error";
import CategoryValidatorFactory from "../factory/category.validator.factory";
import CategoryInterface from "./category-interface";

export default class Category extends Entity implements CategoryInterface {
    private _name: string;
    private _code: string;
    private _description: string;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(id: string, name: string, code: string, description: string, createdAt: Date, updatedAt: Date) {
        super();
        this._id = id;
        this._name = name;
        this._code = code;
        this._description = description;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
        this.validate();
        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
          }           
    }

    get name(): string {
        return this._name;
    }

    get code(): string {
        return this._code;
    }

    get description(): string {
        return this._description;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }    

    changeName(name: string): void {
        this._name = name;
        this.validate();
    }

    changeCode(code: string): void {
        this._code = code;
        this.validate();
    }
    
    changeDescription(description: string): void {
        this._description = description;
        this.validate();
    }

    changeUpdatedAt(updatedAt: Date): void {
        this._updatedAt = updatedAt;
        this.validate();
    }    

    validate() {
        return CategoryValidatorFactory.create().validate(this);
      }    
}