import Joi from "joi"

export const updateFavPokemonSchema = Joi.object({
    pokemonId: Joi.number().required(),
})
