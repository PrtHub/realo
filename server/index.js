import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from './routes/user.routes.js'

dotenv.config()

mongoose.connect(process.env.MONOGODB_URL).then(() => {
    console.log("Connected to MongoDB")
}).catch(() => {
    console.log("Failed to connect to MongoDB")
})

const app = express()

app.use('/api/user', userRouter)

app.listen(3000, () => {
    console.log("Server listening on port 3000")
})