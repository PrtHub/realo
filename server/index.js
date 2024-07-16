import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'

dotenv.config()

mongoose.connect(process.env.MONOGODB_URL).then(() => {
    console.log("Connected to MongoDB")
}).catch(() => {
    console.log("Failed to connect to MongoDB")
})

const app = express()
app.use(express.json())

app.listen(3000, () => {
    console.log("Server listening on port 3000")
})

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})