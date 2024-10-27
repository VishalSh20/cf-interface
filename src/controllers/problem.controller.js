import scrapeProblem from "../utils/problem.js";
import scrapeContestInfo from "../utils/scrapeUtils/contest.js";

export async function getProblem(req,res){
   try { 
     const {contestId,problemId} = req.query;

     if(!contestId || !problemId)
        return res.status(400).json({error:"Contest Id and Problem Id are required"});
     if(contestId<0 || isNaN(Number(contestId)))
        return res.status(400).json({error:"Contest Id is not valid"});
     
     const contestScrapingResponse = await scrapeContestInfo(contestId);
     if(contestScrapingResponse.error)
        return res.status(500).json({error:contestScrapingResponse.error});
     
     if(contestScrapingResponse.problems.map(p => p.index).indexOf(problemId.toUpperCase()) === -1)
        return res.status(500).json({error:"Invalid Problem ID"});
 
     const problemScrapingResponse = await scrapeProblem(contestId,problemId);
     const {problem} = problemScrapingResponse;
     if(problem)
     res.status(200).json(problemScrapingResponse);
     else
     res.status(500).json(problemScrapingResponse);
   } 
   catch (error) {
     res.status(500).json(error.status || "Error occured while scraping the problem");
   }
   
}