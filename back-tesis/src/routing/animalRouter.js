import { Router } from "express";
import AnimalController from "../controllers/animalController.js";
import authenticate from "../middlewares/authMiddlewares.js";

const animalRouter = Router();
const animalController = new AnimalController;

animalRouter.use(authenticate);

animalRouter.post("/createAnimal", animalController.createAnimal);
animalRouter.get("/getAnimalByNumber/:animalNumber", animalController.getAnimalByNumber);

export default animalRouter;