import userSchema from "../models/userModel.js"
import menuSchema from "../models/menuModel.js"
const validateMenu = (req, res, next) => {
    const { error } = menuSchema.validate(req.body)

    if (error) {
        return res.status(400).json({ error: error.details[0].message })

    }
    next()

}

export default validateMenu