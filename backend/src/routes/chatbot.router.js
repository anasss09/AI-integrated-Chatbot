import express from 'express'
import { postChatbot } from '../controller/chatbot.controller.js';
const router = express.Router()

router.post('/chat', postChatbot)

export default router;