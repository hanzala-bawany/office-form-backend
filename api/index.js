import express from "express"
import { authRoutes } from "../src/routes/authRoute.js"
import { connectDB } from "../src/utills/connectDB.js"
import cookieParser from "cookie-parser"
import cors from "cors"


connectDB()

const app = express()
const port = 3001

app.use(cors({
  origin : "*" ,
  credentials : true
 }));

app.use(express.json())
app.use(cookieParser());

app.use('/api/auth', authRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
