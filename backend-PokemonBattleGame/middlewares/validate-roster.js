import { rosterSchema } from "../schemas/roster-schema.js"

export const validateRoster = (req, res, next) => {
    const { error } = rosterSchema.validate(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })

    next()
}
