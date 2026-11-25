import {ChatGoogle} from "@langchain/google"
import { searchTool } from "../tools/tools.js"
import { createAgent } from "langchain";



export async function AgentSearchService(prompt){
   try {
    const model = new ChatGoogle("gemini-3.5-flash-lite")
    var agent = createAgent({model,tools:[searchTool]})

    const result = await agent.invoke({
        messages:[{role:"user",content:prompt}]
    })
    return result
   } catch (error) {
    console.log(error)
    return error
}
}
