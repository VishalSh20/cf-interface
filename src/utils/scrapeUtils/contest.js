import { Browser, Builder,By,until } from "selenium-webdriver";
import {chromeOptions} from "../scrapingConstants.js"

export default async function scrapeContestInfo(contestId){
    let driver;
    try {
        driver = new Builder().forBrowser(Browser.CHROME).setChromeOptions(chromeOptions).build();

        const requestURL = `https://codeforces.com/contest/${contestId}`;
        await driver.get(requestURL);

        const urlLoaded = await driver.getCurrentUrl();
        if(urlLoaded !== requestURL)
            return {error:"Page not available - check contest id !!"}

        await driver.wait(until.elementLocated(By.className('datatable')), 10000);

        const titleElement = await driver.findElement(By.css("#sidebar > div:first-child > table > tbody > tr:first-child"));
        const title = await titleElement.getAttribute('innerText');
        const statusElement = await driver.findElement(By.css("#sidebar > div:first-child > table > tbody > tr:nth-child(2)"));
        const status = await statusElement.getAttribute('innerText');

        const problemElements = await driver.findElements(By.css("table.problems > tbody > tr"));
        const totalProblems = problemElements.length;
        
        let problems = [];
        for(let i=1; i<totalProblems; i++){
            let currProblem = {};
            const indexElement = await driver.findElement(By.css(`table.problems > tbody > tr:nth-child(${i+1}) > td:nth-child(1)`));
            currProblem.index = await indexElement.getAttribute("innerText");
            const nameElement = await driver.findElement(By.css(`table.problems > tbody > tr:nth-child(${i+1}) > td:nth-child(2) > div > div:first-child`));
            currProblem.name = await nameElement.getAttribute("innerText");
            const constraintElement = await driver.findElement(By.css(`table.problems > tbody > tr:nth-child(${i+1}) > td:nth-child(2) > div > div:nth-child(2)`));
            currProblem.constraints = (await constraintElement.getAttribute("innerText")).split('\n');
            const countElement = await driver.findElement(By.css(`table.problems > tbody > tr:nth-child(${i+1}) > td:nth-child(4)`));
            currProblem.acceptedCount = await countElement.getAttribute('innerText');
            currProblem.acceptedCount = Number(currProblem.acceptedCount.substr(currProblem.acceptedCount.indexOf("x")+1));
            problems.push(currProblem);
        }

        return {
           message:"OK", contest:{title,status,problems}
        }

    } catch (error) {
        return {error:errorMessage};
    }
    finally{
        await driver.quit();
    }
    
}