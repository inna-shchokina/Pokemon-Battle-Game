import { model, Schema } from "mongoose"

const user = new Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    userName: { type: String, require: true },
    country: { type: String, require: false },
    favPokemonIds: [{ type: Number }],
})

export const User = model("User", user)
