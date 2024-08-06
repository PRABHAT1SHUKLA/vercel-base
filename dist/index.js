"use strict";
// satellite address :121RTSDpyNZVcEU84Ticf2L1ntiuUimbWgfATz21tuvgk3vzoA6@ap1.storj.io:7777 
// API  key15XZhFUcvdb4RoK9KSs4E8BBsE9XKfCqxwBCPi7GaMGnaPRq5RF23n7MoFcWeQfcywgF5xvaD44JDbxQf9o5RmzNiogfp31Dtq7zK5GxQn1sgzrH2gd2p98nEVszK4ttXFRq5viEy
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// s3
// access key ; jx246knid73al2qe2ny4dxq3xy2q
// secret key: jyxdn5vg4brtuosemik42t277vupagjothjf57d34ftf2n7nl4y4i
// endpoint:https://gateway.storjshare.io
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const utils_1 = require("./utils");
const simple_git_1 = __importDefault(require("simple-git"));
const path_1 = __importDefault(require("path"));
const file_1 = require("./file");
const aws_1 = require("./aws");
const redis_1 = require("redis");
const publisher = (0, redis_1.createClient)();
publisher.connect();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = 5000;
console.log(__dirname);
app.post("/deploy", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repoUrl = req.body.repoUrl;
    const id = (0, utils_1.generate)();
    yield (0, simple_git_1.default)().clone(repoUrl, path_1.default.join(__dirname, `output/${id}`));
    const files = (0, file_1.getAllFiles)(path_1.default.join(__dirname, `output/${id}`));
    files.forEach((file) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedaddress = (0, utils_1.normalizePath)(file.slice(__dirname.length + 1));
        yield (0, aws_1.uploadFile)(updatedaddress, file);
    }));
    publisher.lPush("build-queue", id);
    res.json({
        id: id
    });
}));
app.listen(PORT);
