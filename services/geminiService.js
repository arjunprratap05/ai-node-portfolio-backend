require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

if (!process.env.GOOGLE_API_KEY) {
    console.error("CRITICAL: GOOGLE_API_KEY is not set.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function callGeminiWithRetry(prompt, maxRetries = 3) {
    let delay = 2000; 
    for (let i = 0; i < maxRetries; i++) {
        try {
            const result = await model.generateContent(prompt);
            return result.response.text();
        } catch (error) {
            if (error.status === 429 || error.message.includes("429")) {
                console.warn(`Quota exceeded. Retrying in ${delay / 1000}s... (Attempt ${i + 1})`);
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2; 
                continue;
            }
            throw error;
        }
    }
    throw new Error("AI is currently overwhelmed. Please try again in 1 minute.");
}

const getGeminiResponse = async (userMessage) => {
    const arjunKnowledgeBase = `
        Arjun Pratap: Full Stack (MERN) & GenAI Engineer with 3.3 years experience.
        Current Role: Software Developer at NIIT Ltd (since Sep 2022).
        
        Key Achievements:
        - Maintains scalable REST APIs handling 10,000+ requests per day.
        - Reduced manual effort by 40% via OpenAI API integrations (chat, summarization).
        - Optimized MongoDB queries, reducing average response times by 30-35%.
        - Reduced deployment time by 40% using Docker & GitHub Actions CI/CD.
        
        Key Projects:
        - AI GitHub Profile Analyzer: MERN + OpenAI platform; reduced latency by 60%.
        - Blog Management Platform: Supports 5,000+ daily API requests.
        - Internal Workflow Automation: Improved productivity by 35% using OpenAI LLM orchestration.
    `;
    
    const fullPrompt = `You are Arjun AI. Context: ${arjunKnowledgeBase}\nUser Question: ${userMessage}`;
    return await callGeminiWithRetry(fullPrompt);
};

module.exports = { getGeminiResponse };