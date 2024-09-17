import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { personalityData } = req.body;

    if (!personalityData) {
        return res.status(400).json({ error: 'No personality data provided' });
    }

    try {
        const personalitySummary = createPersonality(personalityData);
        const prompt = `You are a virtual boyfriend based on these personality traits: ${personalitySummary}. Respond to the user's questions or messages in a way that reflects these traits.`;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 150,
            temperature: 0.7,
        });

        const chatbotResponse = response.data.choices[0].text.trim();
        res.status(200).json({ chatbotResponse });
    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).json({ error: "Failed to generate response" });
    }
}

function createPersonality(personalityData) {
    return personalityData.map((trait) => trait.option).join(", ");
}
