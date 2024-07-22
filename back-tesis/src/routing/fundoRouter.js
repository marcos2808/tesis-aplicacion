import { Router } from "express";
import FundoController from "../controllers/fundoController.js";
import authenticate from "../middlewares/authMiddlewares.js";


const fundoRouter = Router();

fundoRouter.use(authenticate);

fundoRouter.post("/createFundo", FundoController.createFundo);
fundoRouter.delete("/deleteFundo", FundoController.deleteFundo);
fundoRouter.put("/updatePassword", FundoController.updatePassword);
fundoRouter.put("/updateFundo", FundoController.updateFundo);

export default fundoRouter;