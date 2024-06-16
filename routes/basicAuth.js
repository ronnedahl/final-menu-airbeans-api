import {Router} from 'express'
import { findUser,createUser } from '../services/basicAuth.js'
import validate from '../middlewares/validate.js'

const router = Router()

//  REGISTER A NEW USER
router.post('/register', validate, async (req, res) => {
    const user = await findUser(req.body.username)
     
    if (user) {
        return res.status(400).json({ error: 'sorry user already exists' })
    }
    const newUser = await createUser(req.body)
   
    const response = {
        success: true,
        status: 201,
        message: 'user created successfully',
        data: newUser
        
    }
    res.json(response)
})

//Login in user and check with users.db if the 
//password and the name is correct.
router.post('/login',validate,async (req,res)=> {
    const user = await findUser(req.body.username)
    if(!user){

        return res.status(400).json({ error: 'User dont exists'})
    }else if (user.password !== req.body.password){

    return res.status(400).json({ error: 'The password is incorrect'})
    }
    global.user = user
    return res.status(200).json({message: 'user successfully logged in '})
    })

    export default router