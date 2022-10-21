import express, { Request, Response } from "express";
import CreateCategoryUseCase from "../../../usecase/category/create/create.category.usecase";
import DeleteCategoryUseCase from "../../../usecase/category/delete/delete.category.usecase";
import FindCategoryUseCase from "../../../usecase/category/find/find.category.usecase";
import ListCategoryUseCase from "../../../usecase/category/list/list.category.usecase";
import UpdateCategoryUseCase from "../../../usecase/category/update/update.category.usecase";
import CategoryRepository from "../../category/repository/sequelize/category.repository";

export const categoryRoute = express.Router();

categoryRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new CreateCategoryUseCase(new CategoryRepository());
    try {
        const input = {
            name: req.body.name,
            code: req.body.code,
            description: req.body.description,
        };
        
        const output = await usecase.execute(input);
        res.status(201);
        res.send(output);

    } catch(err) {
        res.status(500).send(err);
    }
});

categoryRoute.get("/", async (req: Request, res: Response) => {
    const usecase = new ListCategoryUseCase(new CategoryRepository());
    try {
        const input = {};
        
        const output = await usecase.execute(input);
        res.send(output);

    } catch(err) {
        res.status(500).send(err);
    }
});

categoryRoute.get("/:id", async (req: Request, res: Response) => {
    const usecase = new FindCategoryUseCase(new CategoryRepository());
    try {
        const input = {
            id: req.params.id
        };
        
        const output = await usecase.execute(input);
        res.send(output);

    } catch(err) {
        res.status(500).send(err);
    }
});

categoryRoute.put("/:id", async (req: Request, res: Response) => {
    const usecase = new UpdateCategoryUseCase(new CategoryRepository());
    try {
        const input = {
            id: req.params.id,
            name: req.body.name,
            code: req.body.code,
            description: req.body.description,
        };
        
        const output = await usecase.execute(input);
        res.send(output);

    } catch(err) {
        res.status(500).send(err);
    }
});

categoryRoute.delete("/:id", async (req: Request, res: Response) => {
    const usecase = new DeleteCategoryUseCase(new CategoryRepository());
    try {
        const input = {
            id: req.params.id,
        };
        
        const output = await usecase.execute(input);
        res.status(204);
        res.send(output);

    } catch(err) {
        res.status(500).send(err);
    }
});