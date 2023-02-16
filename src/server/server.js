import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

mongoose.set("strictQuery", true)
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser:true,
}).then(() => console.log('Connected!'))
.catch(err=>console.log(err.message))



export default mongoose   