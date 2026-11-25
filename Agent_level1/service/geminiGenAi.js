import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
})

export default async function GeminiCall(content){
    try {
        const cont = await ai.models.generateContentStream({
        model:"gemini-3.5-flash-lite",
        contents:content,
    })
    for await (let one of cont){
     process.stdout.write(one.text);
    }
    } catch (error) {
        console.log("error",error)
    }
}