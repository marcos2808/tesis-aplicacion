import { Router } from "express";
import fundoRouter from "./fundoRouter.js"
import authRouter from "./authRouter.js";
import animalRouter from "./animalRouter.js";

const router = Router();

router.use('/fundos', fundoRouter);
router.use('/auth', authRouter);
router.use('/animal',animalRouter);

export default router;