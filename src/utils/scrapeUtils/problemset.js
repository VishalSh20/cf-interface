import { Browser, Builder,By,until } from "selenium-webdriver";
import {chromeOptions} from "../scrapingConstants.js";

export default async function scrapeProblemSet(page=1,upperLimit=4000,lowerLimit=800,tags=[]){
    let driver;
    try {
        driver = new Builder().forBrowser(Browser.CHROME).setChromeOptions(chromeOptions).build();
        const requestURL = `https://codeforces.com/problemset/page/${page}?tags=${tags.join(',')}${tags.length ? "," : ""}${lowerLimit}-${upperLimit}`.replaceAll(' ','%20');
        // console.log(requestURL);
        await driver.get(requestURL);

        const urlLoaded = await driver.getCurrentUrl();
        if(urlLoaded !== requestURL)
            return {error:"Page not available - check the params passed"};

        await driver.wait(until.elementLocated(By.className('datatable')), 10000);

        const problemElements = await driver.findElements(By.css("table.problems > tbody > tr"));
        const totalProblems = problemElements.length;
        
        let problems = [];
        for(let i=1; i<totalProblems; i++){
            let currProblem = {};
            const idElement = await driver.findElement(By.css(`table.problems > tbody > tr:nth-child(${i+1}) > td:nth-child(1)`));
            currProblem.id = (await idElement.getAttribute("innerText")).trim();
            currProblem.contestId = Number(currProblem.id.substring(0,4));
            currProblem.problemId = currProblem.id.substring(4);
            currProblem.url = `https://codeforces.com/problemset/problem/${currProblem.contestId}/${currProblem.problemId}`

            const titleElement = await driver.findElement(By.css(`table.problems > tbody > tr:nth-child(${i+1}) > td:nth-child(2) > div:first-child`));
            currProblem.title = (await titleElement.getAttribute("innerText")).trim();

            const topicsElement = await driver.findElement(By.css(`table.problems > tbody > tr:nth-child(${i+1}) > td:nth-child(2) > div:nth-child(2)`));
            currProblem.topics = (await topicsElement.getAttribute("innerText")).split(',');
            currProblem.topics = currProblem.topics.map(topic => topic.trim());

            const ratingElement = await driver.findElement(By.css(`table.problems > tbody > tr:nth-child(${i+1}) > td:nth-child(4)`));
            currProblem.rating = (await ratingElement.getAttribute('innerText')).trim();
            currProblem.rating = Number(currProblem.rating);

            const countElement = await driver.findElement(By.css(`table.problems > tbody > tr:nth-child(${i+1}) > td:nth-child(5)`));
            currProblem.acceptedCount = (await countElement.getAttribute('innerText')).trim();
            currProblem.acceptedCount = Number(currProblem.acceptedCount.substr(currProblem.acceptedCount.indexOf("x")+1));

            problems.push(currProblem);
        }

        return {
            message:"OK",
            page,
            problems
        }

    } catch (error) {
        return {error:error.message};
    }
    finally{
        await driver.quit();
    }
    
}