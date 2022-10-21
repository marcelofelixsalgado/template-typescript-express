import { app, sequelize } from "../express";
import request from "supertest";

const healthCehckPath = "/health";

describe("E2E test for category", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should get a successful health status", async () => {
        const response = await request(app)
        .get(healthCehckPath)
        .send();

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: "available",
        });            
    });
});    
