import { ChatGoogle } from "@langchain/google";
import { createAgent } from "langchain";
import { EmailTool } from "../tools/CustomerEmailTool.js";

export async function emailService(prompt){
    try{
          const model = new ChatGoogle({model:"gemini-3.5-flash-lite",temperature:0})

          const agent = createAgent({
           model,
           tools:[EmailTool],
          systemPrompt:"You are an assistant that can send emails. Only send an email when the user clearly asks. Confirm the recipient and content in your final reply."
             })

        const result = await agent.invoke({
         messages:[
         {
            role:"user",
            content:prompt
        }
    ]
})

return result
    }catch(err){
        return err
    }
}

