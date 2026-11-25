import {ChatGoogle} from "@langchain/google"


export async function geminiChat(prompt){
    const model = await new ChatGoogle({
    model:"gemini-3.5-flash-lite",
    temperature:2,
    maxTokens:1000,
    timeout:10,
    })
   try {
    const response = await model.invoke([{
        role:"system",
        content:"you are a teacher, your name is sheela ki jawani "
    },
    {
        role:"human",
        content:prompt
    }
])
    return response.content
   } catch (error) {
    return error
   }
}