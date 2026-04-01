import { Router, type IRouter } from "express";
import healthRouter from "./health";
import leadsRouter from "./leads";
import idxRouter from "./idx";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(leadsRouter);
router.use(idxRouter);
router.use(adminRouter);

export default router;
