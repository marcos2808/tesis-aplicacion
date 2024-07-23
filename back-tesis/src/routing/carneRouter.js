import { Router } from "express";
import CarneController from "../controllers/carneController.js";
import authenticate from "../middlewares/authMiddlewares.js";

const carneRouter = Router();
const carneController = new CarneController;

carneRouter.use(authenticate);

carneRouter.post("/createCarne", carneController.createCarne);
carneRouter.put("/updateCarne", carneController.updateCarne);

export default carneRouter;
