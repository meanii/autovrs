import { Router } from "express";
import storageRouter from "./storage/index.js";
import { AutoVrsController } from "./autovrs.controller.js";
import engineRouter from "./engine/index.js";

const router = Router();

router.get(`/`, AutoVrsController.getAll)
router.get(`/:id`, AutoVrsController.getById)

router.use(`/storage`, storageRouter)
router.use(`/engine`, engineRouter)

export default router;