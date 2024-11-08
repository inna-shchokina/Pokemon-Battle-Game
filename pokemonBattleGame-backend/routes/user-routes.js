import { Router } from "express"
import { validateUser } from "../middlewares/validate-user.js"
import { validateUpdateFavPokemon } from "../middlewares/validate-update-fav-pokemon.js"
import {
    deleteUserById,
    getUsers,
    createUser,
    addFavPokemon,
    removeFavPokemon,
    getUserById,
} from "../controllers/user-controller.js"

export const userRouter = Router()

userRouter.get("/", getUsers)
userRouter.get("/:id", getUserById)

userRouter.delete("/:id", deleteUserById)

userRouter.post("/", validateUser, createUser)

userRouter.put("/:id/add-fav-pokemon", validateUpdateFavPokemon, addFavPokemon)
userRouter.put(
    "/:id/remove-fav-pokemon",
    validateUpdateFavPokemon,
    removeFavPokemon,
)
