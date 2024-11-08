import { battleOutcomeSchema } from "../schemas/battle-outcome-schema.js"

export const validateBattleOutcome = (req, res, next) => {
    const { error } = battleOutcomeSchema.validate(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })

    next()
}
