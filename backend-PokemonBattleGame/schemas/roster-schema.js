import Joi from "joi"

export const rosterSchema = Joi.object({
    id: Joi.number().integer().required(),
    ownerId: Joi.number().integer().required(),
    pokemonIds: Joi.array().items(Joi.number().integer()).length(6).required(),
})
