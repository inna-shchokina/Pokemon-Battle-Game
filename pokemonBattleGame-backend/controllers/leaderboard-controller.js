import { BattleOutcome } from "../models/battle-outcome.js"

export const getLeaderboard = async (_, res) => {
    const summary = await BattleOutcome.aggregate([
        {
            $facet: {
                redPlayers: [
                    {
                        $project: {
                            userId: "$playerRed.userId",
                            score: "$playerRed.score",
                        },
                    },
                ],
                bluePlayers: [
                    {
                        $project: {
                            userId: "$playerBlue.userId",
                            score: "$playerBlue.score",
                        },
                    },
                ],
            },
        },
        {
            $project: {
                allPlayers: { $concatArrays: ["$redPlayers", "$bluePlayers"] },
            },
        },
        { $unwind: "$allPlayers" },
        {
            $group: {
                _id: "$allPlayers.userId",
                totalScore: { $sum: "$allPlayers.score" },
            },
        },
        {
            $project: {
                _id: 0,
                userId: "$_id",
                score: "$totalScore",
            },
        },
        { $sort: { score: -1 } },
    ])

    return res.status(200).json(summary)
}
