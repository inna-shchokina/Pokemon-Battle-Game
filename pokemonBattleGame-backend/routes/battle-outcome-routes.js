import { Router } from "express"
import { validateBattleOutcome } from "../middlewares/validate-battle-outcome.js"
//import { BattleOutcome } from "../models/battle-outcome.js"

import {
    createBattleOutcome,
    getBattleOutcome,
    getBattleOutcomeById,
} from "../controllers/battle-outcome-controller.js"

export const battleOutcomeRouter = Router()

battleOutcomeRouter.get("/", getBattleOutcome)
battleOutcomeRouter.get("/:id", getBattleOutcomeById)
battleOutcomeRouter.post("/", validateBattleOutcome, createBattleOutcome)
