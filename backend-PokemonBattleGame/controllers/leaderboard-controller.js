import { BattleOutcome } from "../models/battle-outcome.js";

export const getLeaderboard = async (_, res) => {
    try {
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
                                userId: "computerID",
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
                $match: { _id: { $ne: "computerID" } }, 
            },
            {
                $project: {
                    _id: 0,
                    userId: "$_id",
                    score: "$totalScore",
                },
            },
            { $sort: { score: -1 } },
        ]);

        return res.status(200).json(summary);
    } catch (error) {
        console.error("Error in getLeaderboard:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
