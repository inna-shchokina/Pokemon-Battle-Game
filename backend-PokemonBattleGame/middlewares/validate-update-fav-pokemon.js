import { updateFavPokemonSchema } from "../schemas/update-fav-pokemon-schema.js"

export const validateUpdateFavPokemon = (req, res, next) => {
    const { error } = updateFavPokemonSchema.validate(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })

    next()
}
