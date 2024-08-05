// satellite address :121RTSDpyNZVcEU84Ticf2L1ntiuUimbWgfATz21tuvgk3vzoA6@ap1.storj.io:7777 
// API  key15XZhFUcvdb4RoK9KSs4E8BBsE9XKfCqxwBCPi7GaMGnaPRq5RF23n7MoFcWeQfcywgF5xvaD44JDbxQf9o5RmzNiogfp31Dtq7zK5GxQn1sgzrH2gd2p98nEVszK4ttXFRq5viEy


// s3
// access key ; jx246knid73al2qe2ny4dxq3xy2q
// secret key: jyxdn5vg4brtuosemik42t277vupagjothjf57d34ftf2n7nl4y4i
// endpoint:https://gateway.storjshare.io

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