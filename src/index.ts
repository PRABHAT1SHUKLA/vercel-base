import express from "express"
import cors from  "cors"
import { generate } from "./utils";
import simpleGit from "simple-git";
import path from "path";
import { getAllFiles } from "./file";
const app = express();

app.use(express.json())
app.use(cors());
const PORT=5000;


console.log(__dirname)
 app.post("/deploy", async(req,res)=>{

    const repoUrl = req.body.repoUrl;

    const id = generate();

    await simpleGit().clone(repoUrl , path.join(__dirname,`output/${id}`));

    const files = getAllFiles(path.join(__dirname,`output/${id}`))
    console.log(files)
    res.json({
        id:id
    })
 })


 app.listen(PORT)