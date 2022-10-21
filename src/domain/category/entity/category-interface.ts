export default interface CategoryInterface {
    get id(): string;
    get name(): string;
    get code(): string;
    get description(): string;
    get createdAt(): Date;
    get updatedAt(): Date;

    changeName(name: string): void;
    changeCode(code: string): void;
    changeDescription(description: string): void;
    changeUpdatedAt(updatedAt: Date): void;
}