import { Router } from "express";
import fundoRouter from "./fundoRouter.js"
import authRouter from "./authRouter.js";

const router = Router();

router.use('/fundos', fundoRouter);
router.use('/auth', authRouter);

export default router;