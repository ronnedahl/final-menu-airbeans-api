import cors from 'cors';
import express from 'express';
import menuRouter from './routes/menu.js';
import authRouter from './routes/basicAuth.js'

const app = express();
const PORT = process.env.PORT || 3000;
global.user = null

//middlewares
app.use(express.json());
app.use(cors())

//routes
app.use('/menu',menuRouter);
app.use('/auth', authRouter)




app.listen(PORT,(req,res)=>{
    console.log('Server is running on port'+ PORT);
})