import {geminiChat} from "../service/LangChain.js"
import { AgentSearchService} from "../service/agentGemini.js"
import { emailService } from "../service/EmailerAgentGemini.js"
import { agentGraph } from "../service/Langgraph.js"
export async function geminiController(req,res){
    try {
        let {prompt} = req.body
    if(!prompt){
        return res.status(400).json({message:"if you want any help please enter prompt"})
    }
   const response = await geminiChat(prompt)
    return res.status(201).json({message:response})
    } catch (error) {
        return res.status(401).json({message:"something is wrong"})
    }
}

export async function agentGeminiController(req,res){
    try {
        let {prompt} = req.body;
        if(!prompt){
        return res.status(400).json({message:"if you want any help please enter prompt"})
        }
        const response = await AgentSearchService(prompt)
        console.log(response);
        return res.status(200).json({message:response.messages[response.messages.length-1].content})
    } catch (error) {
        console.log(error)
        return res.status(400).json({error})
    }
}

export async function EmailAgentController(req,res){
    try {
        let {prompt} = req.body;
        if(!prompt){
        return res.status(400).json({message:"if you want any help please enter prompt"})
        }
        const response = await emailService(prompt)
        console.log(response);
        return res.status(200).json({message:response.messages[response.messages.length-1].content})
    } catch (error) {
        console.log(error)
        return res.status(400).json({error})
    }
}

export async function agentG(req,res){
    try {
        const {prompt} = req.body
         if(!prompt){
        return res.status(400).json({message:"if you want any help please enter prompt"})
        }
        const response = await agentGraph(prompt)
        console.log(response);
        return res.status(200).json({message:response.messages[response.messages.length-1].content})
    } catch (error) {
        console.log(error)
        return res.status(400).json({error})
    }
}
