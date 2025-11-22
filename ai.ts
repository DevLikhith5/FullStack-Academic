
import { GoogleGenAI, Type } from "@google/genai";
import { Question, Topic, Difficulty } from "./types";

export const generateQuizQuestions = async (
  topic: Topic | 'All',
  difficulty: Difficulty,
  count: number,
  customTopic?: string
): Promise<Question[]> => {
  try {
    if (!process.env.API_KEY) {
        throw new Error("API Key missing");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    let subject = topic === 'All' ? 'General Knowledge' : topic;
    
    // Override subject if it's a custom topic
    if (topic === 'Custom' && customTopic && customTopic.trim() !== '') {
      subject = customTopic;
    }

    const prompt = `Generate ${count} multiple-choice trivia questions about: "${subject}". 
    Difficulty level: ${difficulty}.
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
    console.log("RESPONSE: ",response)

    if (response.text) {
      const data = JSON.parse(response.text);
      return data.map((q: any, index: number) => {
         // Sanitize options and correctAnswer to prevent whitespace mismatches
         const options = q.options.map((o: string) => String(o).trim());
         let correctAnswer = String(q.correctAnswer).trim();
         
         // Robust check: Ensure correct answer is actually in the options
         const exactMatchIndex = options.findIndex((o: string) => o === correctAnswer);
         
         if (exactMatchIndex === -1) {
            // Try case-insensitive match
            const caseIndex = options.findIndex((o: string) => o.toLowerCase() === correctAnswer.toLowerCase());
            if (caseIndex !== -1) {
                correctAnswer = options[caseIndex];
            } else {
                // Fallback: If AI hallucinates a completely different answer, default to the first option
                // This prevents the game from breaking (no green answer shown)
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
