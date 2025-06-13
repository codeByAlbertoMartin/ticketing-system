import Joi from 'joi';

const  ticketSchema = Joi.object({
  user: Joi.string().required(),
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  status: Joi.string().valid('open', 'in-progress', 'closed').required(),
  priority: Joi.string().valid('low', 'medium', 'high').required()
})

export default ticketSchema;