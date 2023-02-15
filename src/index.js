import express from 'express'
import './server/server.js'
import path from 'path'
import cors from  'cors'
import dotenv from 'dotenv'

//router pages
import UserRouter from './routes/UserRouter.js'
import ProductRouter from './routes/ProductRouter.js'
import DogsRouter from './routes/DogsRouter.js'
import AdminUser from './routes/Admin/api/AdminRouter.js'
import pageRouter from './routes/Admin/site/admin.router.js'
import CartRouter from './routes/CartRouter.js'

dotenv.config()

//express function
const app = express() 
//port 
const port = process.env.PORT 
 //middlewares
app.use(express.json())
app.use(cors({
    origin:"https://legacyKennels.org",
    
}))

// router routes
app.use(UserRouter)
app.use(ProductRouter)
app.use(CartRouter)
app.use(DogsRouter)
app.use(AdminUser)


app.listen(port, ()=>console.log('listening on '+port))