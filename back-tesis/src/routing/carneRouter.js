import { Router } from "express";
import CarneController from "../controllers/carneController.js";
import authenticate from "../middlewares/authMiddlewares.js";

const carneRouter = Router();
const carneController = new CarneController;



carneRouter.post("/createCarne", authenticate, carneController.createCarne);
carneRouter.put("/updateCarne", carneController.updateCarne);

export default carneRouter;
