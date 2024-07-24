import { Router } from "express";
import fundoRouter from "./fundoRouter.js"
import authRouter from "./authRouter.js";
import animalRouter from "./animalRouter.js";
import carneRouter from "./carneRouter.js";
import lecheRouter from "./lecheRouter.js";

const router = Router();

router.use('/fundos', fundoRouter);
router.use('/auth', authRouter);
router.use('/animal',animalRouter);
router.use('/carne', carneRouter);
router.use('/leche', lecheRouter);


export default router;