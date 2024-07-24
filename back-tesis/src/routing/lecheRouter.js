import { Router } from "express";
import authenticate from "../middlewares/authMiddlewares.js";
import lecheController from "../controllers/lecheController.js";

const lecheRouter = Router();


lecheRouter.use(authenticate);

lecheRouter.post("/createLeche", lecheController.createLeche)
lecheRouter.put("/updateLeche", lecheController.updateLeche);
lecheRouter.put("/updateProduccionDiaria", lecheController.updateProduccionDiaria);
lecheRouter.get("/reporteLeche", lecheController.reporteLeche);

export default lecheRouter;