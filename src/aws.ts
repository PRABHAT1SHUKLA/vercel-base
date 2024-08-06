import { S3 } from "aws-sdk";
import fs from "fs";

const s3 = new S3({
    accessKeyId: "jx246knid73al2qe2ny4dxq3xy2q",
    secretAccessKey: "jyxdn5vg4brtuosemik42t277vupagjothjf57d34ftf2n7nl4y4i",
    endpoint: "https://gateway.storjshare.io"
})

// fileName => output/12312/src/App.jsx
// filePath => /Users/harkiratsingh/vercel/dist/output/12312/src/App.jsx
export const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "vercel",
        Key: fileName,
    }).promise();
    console.log(response);
}



