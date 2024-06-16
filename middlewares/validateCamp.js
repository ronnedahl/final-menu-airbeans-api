import campSchema from "../models/campModel.js"

const validateCamp = (req, res, next) => {
    const { error } = campSchema.validate(req.body)

    if (error) {
        return res.status(400).json({ error: error.details[0].message })

    }
    next()

}

export default validateCamp