export async function getHealthCheck(req,res) {
    return res.status(200).json({message:"OK"});
}