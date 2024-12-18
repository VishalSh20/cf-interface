import scrapeContestInfo from "../utils/scrapeUtils/contest.js";

export async function getContestInfo(req,res){
    try {      
        const contestId = req.query?.contestId;
        if(!contestId)
            return res.status(400).json({error:"Contest Id is required"});
        if(contestId<1 || isNaN(Number(contestId)))
            return res.status(400).json({error:"Contest Id is invalid"});
        
        const contestScrapingOutput = await scrapeContestInfo(contestId);
        if(contestScrapingOutput.error)
         return res.status(500).json(contestScrapingOutput);
        
        return res.status(200).json(contestScrapingOutput);
    } catch (error) {
        return res.status(500).json(error.message || "Error occured while scraping the contest Info !!");
    }
    
}