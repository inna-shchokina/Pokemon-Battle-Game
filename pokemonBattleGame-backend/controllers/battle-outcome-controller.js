import { BattleOutcome } from "../models/battle-outcome.js"

export const getBattleOutcome = async (req, res) => {
    const battleOutcomes = await BattleOutcome.find({})
    return res.status(200).json(battleOutcomes)
}

export const getBattleOutcomeById = async (req, res) => {
    try {
        const battleOutcome = await BattleOutcome.findById(req.params.id).exec()

        if (battleOutcome) {
            return res.status(200).json(battleOutcome)
        } else {
            return res.status(404).json({ message: "Battle Outcome not found" })
        }
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message })
    }
}

export const createBattleOutcome = async (req, res) => {
    const outcome = req.body
    try {
        const newOutcome = new BattleOutcome({
            ...outcome,
            createdAt: new Date().toISOString(),
        })
        const { _id } = await newOutcome.save()
        return res.status(200).json({ id: _id })
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message })
    }
}
