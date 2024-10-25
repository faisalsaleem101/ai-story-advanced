import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyDJc3FZ_UlF-6jO7RU0IuEwbWjtg_N6g5s');

export const generateStory = async (
  topic: string,
  length: string,
  creativity: number,
  genre: string,
  style: string
) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Generate a ${length} ${genre} story with ${style} style about ${topic}. 
    Use creativity level: ${creativity * 100}%.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating story:', error);
    throw error;
  }
};