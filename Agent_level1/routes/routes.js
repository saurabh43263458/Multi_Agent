import express from "express"
import {geminiController,agentGeminiController, EmailAgentController} from "../controller/controller.js";

export let route = express.Router();

/**
 * @route : /gemini
 * @description: for gemini to response
 */

route.post("/gemini",geminiController)


/**
 * @route : /agentGemini
 * @description : agent using gemini
 */

route.post("/agent",agentGeminiController)

/**
 * @route :/agentEmail
 *  @description for sending email
 */

route.post("/agentEmail",EmailAgentController)

