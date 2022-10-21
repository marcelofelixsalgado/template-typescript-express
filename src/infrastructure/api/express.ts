import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CategoryModel from "../category/repository/sequelize/category.model";
import { categoryRoute } from "./routes/category.route";
import { healthCheckRoute } from "./routes/health-check.route";

export const app: Express = express();
app.use(express.json());
app.use("/v1/categories", categoryRoute);
app.use("/health", healthCheckRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([CategoryModel]);
  await sequelize.sync();
}
setupDb();
