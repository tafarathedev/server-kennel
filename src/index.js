import express from 'express'
import cors from  'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import './server/server.js'
//router pages
import UserRouter from './routes/UserRouter.js'
import ProductRouter from './routes/ProductRouter.js'
import DogsRouter from './routes/DogsRouter.js'
import AdminUser from './routes/Admin/api/AdminRouter.js'
import CartRouter from './routes/CartRouter.js'
import paymentApi from './routes/StripePayment.js'

dotenv.config()


//express function
const app = express() 
//port 
const port = process.env.PORT 
 //middlewares
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/* 
const whiteList= ['http://localhost:3000/', 'https://master--ubiquitous-granita-bcef3d.netlify.app/'] */

/* const corsOptions = {
    origin: (origin, callback) => {
      if (whiteList.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error())
      }
    }
  } */
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
//checkout session
app.use(paymentApi)


app.listen(port, ()=>console.log('listening on '+port))