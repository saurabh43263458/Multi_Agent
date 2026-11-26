import { tool } from "langchain";
import {z}from "zod"
import { sendmailer } from "../service/NodeMailerService.js";


export const EmailTool= tool(
    async ({to,subject,body})=>{
       try {
          const info = await sendmailer({to,subject,text:body});
          return `Email sent successfully to ${to}.Message ID:${info.messageId}`
       } catch (error) {
         return `failed to send email ${error.message}`;
       }
    },
    {
        name:"emailSenderTool",
        description:"Send a plain-text email to a recipient. Use this when the user asks to email, mail or notify someone. Requires the recipient email address, a subject and the message body",
        schema:z.object({
           to: z.string().email().describe("Recipient email address"),
           subject: z.string().describe("Email subject line"),
           body: z.string().describe("Email body text"),
        })
    }

)