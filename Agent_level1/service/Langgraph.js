import { ChatGoogle } from "@langchain/google"; 
import { searchTool } from "../tools/tools.js"
import { EmailTool } from "../tools/CustomerEmailTool.js";
import { StateGraph, StateSchema,MessagesAnnotation,MessagesValue,START,END,MemorySaver } from "@langchain/langgraph";
import { ToolNode }  from "@langchain/langgraph/prebuilt"



/**  @tools : array of tools as we pass it to bindtools method */
const tools = [searchTool , EmailTool]



/** @model : along with bindTools(tools) method for pre binding the tool */
const model = new ChatGoogle({
    model:"gemini-3.5-flash-lite",
    temperature:0
}).bindTools(tools)





/** @llmNode  llmNode for tools to get added  */
const llmNode =  async(state)=>{
   const response = await model.invoke([
    ...state.messages
   ]);
   return {messages:[response]}
}


/** @conditionalEdge conditionalEdge for llmnode and tools */
const shouldcontinue = async(state)=>{
    const last = state.messages.at(-1);
    return last.tool_calls?.length ? "tool" :END
}


/** @toolNode : executes tool_calls from AI messages */
const toolNode = new ToolNode(tools);




/** @agetnGraph agent */
const workflow = new StateGraph(MessagesAnnotation)
  .addNode("llmNode", llmNode)
  .addNode("tool", toolNode)
  .addEdge(START, "llmNode")
  .addConditionalEdges("llmNode", shouldcontinue, ["tool", END])
  .addEdge("tool", "llmNode");

// the compiled graph is what has .invoke
const agent = workflow.compile({ checkpointer: new MemorySaver() });


/** @result */

export async function agentGraph(prompt, threadId = "default") {
  return agent.invoke(
    { messages: [{ role: "user", content: prompt }] },
    { configurable: { thread_id: threadId } }
  );
}
