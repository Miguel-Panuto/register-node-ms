import Joi from 'joi';

export const RegistryCreationSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid('natural', 'legal').required(),
  cpf: Joi.string().required().min(11).max(14),
  cnpj: Joi.string().when('type', {
    is: 'legal',
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }).min(14).max(18),
  address: Joi.object({
    street: Joi.string().required(),
    number: Joi.alternatives(Joi.string(), Joi.number()).required(),
    complement: Joi.string().optional(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    neighborhood: Joi.string().required(),
    zipCode: Joi.string().required().min(8).max(9),
  }).required(),
  contact: Joi.object({
    cellphone: Joi.string().required().min(11).max(14),
    telephone: Joi.string().required().min(10).max(14),
    email: Joi.string().email().required(),
    confirmEmail: Joi.string().email().valid(Joi.ref('email')).required(),
  }).required(),
});
