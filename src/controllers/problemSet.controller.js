import scrapeProblemSet from "../utils/scrapeUtils/problemset.js";

export async function getProblemSet(req,res) {
    try {
        const {page=1,upperLimit=4000,lowerLimit=800} = req.query;
        const tags = req.query.tags?.split(',');
        if(page<=0)
            return res.status(400).json({error:"Page should be greater than 0"});
        if(isNaN(Number(upperLimit)) || isNaN(Number(lowerLimit)) || Number(upperLimit)<Number(lowerLimit) || Number(upperLimit)<800 || Number(lowerLimit)<800)
            return res.status(400).json({error:"Limits are not valid"});
            
        const scrapingResponse = await scrapeProblemSet(page,upperLimit,lowerLimit,tags);
        if(scrapingResponse.problems)
            return res.status(200).json(scrapingResponse); 
        else
            return res.status(500).json({error:scrapingResponse.error});
    } catch (error) {
        return res.status(500).json({error:error.message || "Something went wrong in scraping problemset!!"});
    }

}