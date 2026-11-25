import "dotenv/config";
import express from "express"
import { route } from "./routes/routes.js";

import { verifyMailer } from "./service/NodeMailerService.js";


let app = express();

app.use(express.json());

app.listen(process.env.PORT,()=>{
    console.log("server is connected");
})
verifyMailer();

app.use("/langchain",route)