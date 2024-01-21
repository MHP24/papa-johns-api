import * as Joi from 'joi';

export const validatorSchema = Joi.object({
  PORT: Joi.number().required(),
  JWT_SECRET: Joi.string().required(),
});
