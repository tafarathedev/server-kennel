import express from 'express'
import cors from  'cors'
import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import './server/server.js'
//router pages
import BlogRouter from './routes/BlogRouter.js'
import UserRouter from './routes/UserRouter.js'
import ProductRouter from './routes/ProductRouter.js'
import DogsRouter from './routes/DogsRouter.js'
import AdminUser from './routes/Admin/api/AdminRouter.js'
import CartRouter from './routes/CartRouter.js'
import Payment from './routes/payment'



//express function
const app = express() 
//port 
const port = process.env.PORT 
 //middlewares
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
      origin:'*',
      methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))






// router routes
app.use(UserRouter)
app.use(ProductRouter)
app.use(CartRouter)
app.use(DogsRouter)
app.use(AdminUser)
app.use(BlogRouter)
app.use(Payment)
//checkout session




app.listen(port, ()=>console.log('listening on '+port))