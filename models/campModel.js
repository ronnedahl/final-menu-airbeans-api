import Joi from 'joi';

const campSchema = Joi.object({
            productsIds: Joi.number().integer().min(1).required(),
           campaignPrice: Joi.number().precision(2).required()
        })
    


export default campSchema;