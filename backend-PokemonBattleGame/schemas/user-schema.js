import Joi from "joi"

export const userSchema = Joi.object({
    firstName: Joi.string().min(2).max(25).required(),
    lastName: Joi.string().min(2).max(25).required(),
    userName: Joi.string().alphanum().min(3).max(30).required(),
    country: Joi.string().min(2).max(20).required(),
})
