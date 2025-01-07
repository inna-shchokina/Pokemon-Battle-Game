import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import { connect } from "mongoose"
import cors from "cors"
import { userRouter } from "./routes/user-routes.js"
import { rosterRouter } from "./routes/roster-routes.js"
import { battleOutcomeRouter } from "./routes/battle-outcome-routes.js"
import { leaderboardRouter } from "./routes/leaderboard-routes.js"

dotenv.config()
const app = express()

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.raw())
app.use(bodyParser.json())

app.get("/", (_, res) => {
    res.send("the server is working!")
})

app.use("/api/v1/users", userRouter)
app.use("/api/v1/rosters", rosterRouter)
app.use("/api/v1/battle-outcomes", battleOutcomeRouter)
app.use("/api/v1/leaderboards", leaderboardRouter)

const PORT = process.env.PORT || 3000
try {
    await connect(process.env.DATABASE_CONNECTION_STR)

    app.listen(PORT, async () => {
        console.log(`the server is running on http://localhost:${PORT}`)
    })
} catch (error) {
    console.log(error)
}
