import Joi from 'joi';

const menuSchema = Joi.object({
            id: Joi.number().integer().min(1).required(),
            title: Joi.string().required(),
            desc: Joi.string().required(),
			price: Joi.number().precision(2).required()
        })
    


export default menuSchema;