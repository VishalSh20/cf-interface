import scrapeContests from "../utils/scrapeUtils/contests.js";

export async function getContests(req,res) {
   try {
     const {page,filterTypes,filterRated,filterSubstring} = req.query;
     if(page <= 0)
         return res.status(404).json({error:"Page cannot be smaller than 1"});
     if(filterRated && ["yes","no",""].indexOf(filterRated.toLowerCase()) === -1)
         return res.status(400).json({error:"filterRated should either be yes or no(empty string is also valid)"});
     
     const contestScrapingOutput = await scrapeContests(page, filterTypes?.map(type => type.toLowerCase()) ,filterRated?.toLowerCase(),filterSubstring);
     if(contestScrapingOutput.error)
         return res.status(500).json(contestScrapingOutput);
     else
         return res.status(200).json(contestScrapingOutput);
   } catch (error) {
        return res.status(500).json({error:error?.message || "Something went wrong while scraping contests!!"});
   }

}