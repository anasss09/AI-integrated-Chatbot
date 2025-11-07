import { model } from '../config/gemini.js'
import ErrorHandler from '../utils/ErrorHandler.js';

export const postChatbot = async (req, res) => {
    try {
        const { message } = req.body;

        // Guardrail: check if query is career-related
        const allowedTopics = ["career", "stream", "courses", "future", "job", "subject"];
        if (!allowedTopics.some(word => message.toLowerCase().includes(word))) {
            return res.json({ reply: "I can only answer questions related to career guidance." });
        }

        try {
            const prompt = `You are a friendly and knowledgeable career counselor for Class 10 students in India.
                            Answer the following question clearly and simply in short 3 to 5 line:\n\n${message}`;

            const result = await model.generateContent(prompt);
            const reply = result.response.text();

            res.json({ reply });
        } catch (err) {
            console.error("Gemini API Error:", err);
            res.status(500).json({ reply: "Sorry, there was a problem generating a response." });
        }
    } catch (error) {
        throw new ErrorHandler(error.statusCode || 500, `Error in Chatbot please check Gemini Config`)
    }
}