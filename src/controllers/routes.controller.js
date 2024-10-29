export async function getRoutes(req,res) {
    const routes = {
        contest:{
            task:"fetches the details of a contest with the specified id",
            path:"/api/v1/contest",
            queryparams:{
                contestId:"Integer signifying the contest id"
            }
        },
        contests:{
            task:"fetches basic information of the set of contests having information matching the specified params",
            path:"/api/v1/contests",
            queryparams:{
                page:"Integer denoting the page number required",
                filterTypes:"Strings denoting types of contests to be filtered",
                filterRated:"Yes or no denoting whether only rated or only non-rated contests are required(if its absence,both rated and non-rated contests are sent)",
                filterSubstring:"Substring to match in title and writer names"
            }
        },
        problem:{
            task:"fetches the details of a problem with the specified contest and problem ids",
            path:"/api/v1/problem",
            queryparams:{
                contestId:"Integer signifying the contest id",
                problemId:"String signifying the problem id. Generally from 'A' to 'G'"
            }
        },
        problemSet:{
            task:"fetches basic information of the problemset having information matching the specified params",
            path:"/api/v1/problemset",
            queryparams:{
                page:"Integer signifying the page number required",
                upperLimit:"Integer denoting the upper rating limit for problems",
                lowerLimit:"Integer denoting the lower rating limit for problems",
            }
        },
        healthcheck:{
            task:"fetches the health condition of the API",
            path:"/api/v1/healthcheck"
        }
    };
    res.status(200).json(routes);
}