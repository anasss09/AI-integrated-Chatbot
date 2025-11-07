import express, { urlencoded } from 'express'
import mongoose from 'mongoose';
import authRouter from './routes/auth.router.js'
import cookieParser from 'cookie-parser';
import chatbotRouter from './routes/chatbot.router.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT;

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use('/api/auth', authRouter)
app.use('/api/chatbot', chatbotRouter)

mongoose.connect('mongodb://127.0.0.1:27017/carrierGuide').then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on http://localhost: ${PORT}`);
    })
})