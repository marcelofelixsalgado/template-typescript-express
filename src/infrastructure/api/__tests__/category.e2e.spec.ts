import { app, sequelize } from "../express";
import request from "supertest";

const categoryPath = "/v1/categories";

describe("E2E test for category", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a category", async () => {
        const input = {
            name: "Transporte", 
            code: "TR",
            description: "Despesas com combustível e estacionamento",
        }

        const response = await request(app)
        .post(categoryPath)
        .send(input);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: expect.any(String),
            name: input.name,
            code: input.code,
            description: input.description,
            createdAt: expect.any(String),
        });        
    });

    it("should not create a category", async () => {
        const input = {
            name: "Transporte",
        }

        const response = await request(app)
        .post(categoryPath)
        .send(input);

        expect(response.status).toBe(500);
    });

    it("should list all categories", async () => {
        const input1 = {
            name: "Transporte", 
            code: "TR",
            description: "Despesas com combustível e estacionamento",
        }
        const response1 = await request(app).post(categoryPath).send(input1);
        expect(response1.status).toBe(201);

        const input2 = {
            name: "Alimentação", 
            code: "AL",
            description: "Despesas com alimentação",
        }
        const response2 = await request(app).post(categoryPath).send(input2);
        expect(response2.status).toBe(201);

        const listResponse = await request(app).get(categoryPath).send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.categories.length).toBe(2);

        expect(listResponse.body.categories[0]).toEqual({
            id: expect.any(String),
            name: input1.name,
            code: input1.code,
            description: input1.description,
            createdAt: expect.any(String),
            updatedAt: null,
        }); 
        expect(listResponse.body.categories[1]).toEqual({
            id: expect.any(String),
            name: input2.name,
            code: input2.code,
            description: input2.description,
            createdAt: expect.any(String),
            updatedAt: null,
        });
    });

    it("should find a category", async () => {
        const input = {
            name: "Transporte", 
            code: "TR",
            description: "Despesas com combustível e estacionamento",
        }
        const response = await request(app).post(categoryPath).send(input);
        const id = response.body.id;
        expect(response.status).toBe(201);

        const findResponse = await request(app).get(categoryPath +  "/" + id).send();
        expect(findResponse.status).toBe(200);

        expect(findResponse.body).toEqual({
            id: id,
            name: input.name,
            code: input.code,
            description: input.description,
            createdAt: expect.any(String),
            updatedAt: null,
        }); 
    });

    it("should update a category", async () => {
        const input = {
            name: "Transporte", 
            code: "TR",
            description: "Despesas com combustível e estacionamento",
        }
        const response = await request(app).post(categoryPath).send(input);
        const id = response.body.id;
        expect(response.status).toBe(201);

        const updateResponse = await request(app).put(categoryPath +  "/" + id).send(input);
        expect(updateResponse.status).toBe(200);

        expect(updateResponse.body).toEqual({
            id: id,
            name: input.name,
            code: input.code,
            description: input.description,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        }); 
    });

    it("should delete a category", async () => {
        const input = {
            name: "Transporte", 
            code: "TR",
            description: "Despesas com combustível e estacionamento",
        }
        const response = await request(app).post(categoryPath).send(input);
        const id = response.body.id;
        expect(response.status).toBe(201);

        const updateResponse = await request(app).delete(categoryPath +  "/" + id).send();
        expect(updateResponse.status).toBe(204);

        expect(updateResponse.body).toEqual({}); 
    });
});