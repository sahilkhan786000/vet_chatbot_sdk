const OpenAI = require("openai");

/**
 * HuggingFace OpenAI-compatible client
 */
const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_API_KEY,
});

/**
 * Veterinary-only system prompt
 */
const SYSTEM_PROMPT = `
You are a veterinary assistant chatbot.

You can ONLY answer generic veterinary-related questions such as:
- Pet care
- Vaccination schedules
- Diet and nutrition
- Common non-emergency illnesses
- Preventive care

Rules:
- Do NOT answer non-veterinary questions.
- Do NOT give medical diagnosis or prescriptions.
- If the question is unrelated, politely say you cannot help with that.
- Use simple, friendly language.
- Do not include emojis, markdown, or citations.
- Return plain text only.
- Do NOT diagnose illnesses
- Do NOT name specific diseases
- Only provide general advice
- Always recommend consulting a veterinarian

`;

function fallbackAnswer() {
  return `
I can help with general pet care, nutrition, vaccinations, and preventive veterinary advice.
For medical emergencies or diagnosis, please consult a licensed veterinarian.
`.trim();
}

/**
 * Query LLM
 */
async function queryVetLLM(userPrompt) {
  try {
    const completion = await client.chat.completions.create({
      model: "meta-llama/Llama-3.1-8B-Instruct:novita",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.3,
      max_tokens: 400,
    });

    const content = completion.choices?.[0]?.message?.content?.trim();

    if (!content) throw new Error("Empty LLM response");

    return content;
  } catch (error) {
    console.error("LLM error:", error.message);
    return fallbackAnswer();
  }
}

module.exports = { queryVetLLM };
