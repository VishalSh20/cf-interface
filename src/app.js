import express from "express";
import cors from "cors";
import { getProblem } from "./controllers/problem.controller.js";
import { getContestInfo } from "./controllers/contest.controller.js";
import {getProblemSet} from "./controllers/problemSet.controller.js";
import { getContests } from "./controllers/contests.controller.js";
import {getHealthCheck} from "./controllers/healthcheck.controller.js";
import {getIntro} from "./controllers/intro.controller.js";
import { getRoutes } from "./controllers/routes.controller.js";

const app = express();

app.use(cors(
    {
        origin:"*",
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));
app.use(express.json({limit:"64kb"}));
app.use(express.urlencoded({extended:true}));
app.get('/api/v1/',getIntro);
app.get('/api/v1/routes',getRoutes);
app.get('/api/v1/problem',getProblem);
app.get('/api/v1/contest',getContestInfo);
app.get('/api/v1/problemset',getProblemSet);
app.get('/api/v1/contests',getContests);
app.get('/api/v1/healthcheck',getHealthCheck);

export {app};