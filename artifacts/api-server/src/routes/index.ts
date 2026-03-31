import { Router, type IRouter } from "express";
import healthRouter from "./health";
import leadsRouter from "./leads";
import idxRouter from "./idx";

const router: IRouter = Router();

router.use(healthRouter);
router.use(leadsRouter);
router.use(idxRouter); // IDX placeholder routes (future live listings integration)

export default router;
