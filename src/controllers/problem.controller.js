import scrapeProblem from "../utils/problem.js";

export async function getProblem(req,res){
    console.log("Here - ");
    const contestId = req.query.contestId;
    const problemId = req.query.problemId;
    const scrapeResponse = await scrapeProblem(contestId,problemId);
    const {problem,error} = scrapeResponse;
    // console.log(title);
    // console.log(memoryLimit);
    // console.log(timeLimit);
    res.status(200).json({message:"OK",problem}); 
    
}