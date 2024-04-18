import { Router } from "express";
import { EngineController } from "./engine.controller.js";

const engineRouter = Router();

engineRouter.post(`/:id`, EngineController.process)

export default engineRouter;