import express from "express";
import cors from "cors";
import { getProblem } from "./controllers/problem.controller.js";
import { getContestInfo } from "./controllers/contest.controller.js";
import {getProblemSet} from "./controllers/problemSet.controller.js";
import { getContests } from "./controllers/contests.controller.js";

const app = express();

app.use(cors());
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true}));
app.use('/api/v1/problem',getProblem);
app.use('/api/v1/contest',getContestInfo);
app.use('/api/v1/problemset',getProblemSet);
app.use('/api/v1/contests',getContests);

export {app};