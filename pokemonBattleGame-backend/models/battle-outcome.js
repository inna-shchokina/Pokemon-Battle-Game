import { model, Schema } from "mongoose"

const battleOutcome = new Schema({
    playerRed: {
        userId: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
    },
    playerBlue: {
        userId: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
    },
    createdAt: { type: String, required: true },
})

export const BattleOutcome = model("BattleOutcome", battleOutcome)
