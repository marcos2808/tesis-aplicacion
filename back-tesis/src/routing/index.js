import { Router } from "express";
import fundoRouter from "./fundoRouter.js"

const router = Router();

router.use('/fundos', fundoRouter);


export default router;