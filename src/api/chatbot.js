import { Configuration, OpenAIApi} from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req,res) {
    const { personalityData } = req.body;

    try {
        const personalitySummary = createPersonailty(personalityData);
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
        console.error("Error", error)
        res.status(500).json({error: "Failed to generate."})
    }
}

function createPersonailty(personalityData) {
    return personalityData.map((trait) => trait.option).join(", ");
}