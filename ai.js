
import { GoogleGenAI, Type } from "@google/genai";


export const generateQuizQuestions = async (
  topic,
  difficulty,
  count,
  customTopic
) => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API Key missing");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    let subject = topic === 'All' ? 'General Knowledge' : topic;


    if (topic === 'Custom' && customTopic && customTopic.trim() !== '') {
      subject = customTopic;
    }

    const prompt = `Generate ${count} unique, diverse, and non-repetitive multiple-choice trivia questions about: "${subject}". 
    Difficulty level: ${difficulty}.
    
    Guidelines:
    - Ensure questions cover different aspects/sub-topics of "${subject}".
    - Avoid common clichés or extremely well-known facts unless the difficulty is 'Easy'.
    - Make options plausible but clearly distinguishable.
    - Do not repeat questions or very similar concepts.
    - If the topic is broad, ensure a wide variety of sub-themes.

    Return JSON format. Each question must have an 'id', 'text', 'options' (array of 4 strings), 'correctAnswer' (must be exactly one of the options), 'explanation', and 'topic'.
    Ensure the 'correctAnswer' string matches one of the 'options' strings exactly, character for character.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              text: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctAnswer: { type: Type.STRING },
              explanation: { type: Type.STRING },
              topic: { type: Type.STRING }
            }
          }
        }
      }
    });
    console.log("RESPONSE: ", response)

    if (response.text) {
      const data = JSON.parse(response.text);
      return data.map((q, index) => {

        const options = q.options.map((o) => String(o).trim());
        let correctAnswer = String(q.correctAnswer).trim();


        const exactMatchIndex = options.findIndex((o) => o === correctAnswer);

        if (exactMatchIndex === -1) {

          const caseIndex = options.findIndex((o) => o.toLowerCase() === correctAnswer.toLowerCase());
          if (caseIndex !== -1) {
            correctAnswer = options[caseIndex];
          } else {

            console.warn(`AI Data Mismatch: Correct answer '${correctAnswer}' not found in options [${options.join(', ')}]. Defaulting to first option.`);
            correctAnswer = options[0];
          }
        }

        return {
          ...q,
          options,
          correctAnswer,
          id: `ai-${Date.now()}-${index}`,
          topic: topic === 'All' ? q.topic : topic
        };
      });
    }

    throw new Error("No data received from AI");
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};
