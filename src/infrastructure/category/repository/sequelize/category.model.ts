import {
    Table,
    Model,
    PrimaryKey,
    Column
  } from "sequelize-typescript";

@Table({
    tableName: "categories",
    timestamps: false,
})
export default class CategoryModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare code: string;

    @Column({ allowNull: false })
    declare description: string;

    @Column({ allowNull: false })
    declare createdAt: Date;    

    @Column({ allowNull: true })
    declare updatedAt: Date;    

}