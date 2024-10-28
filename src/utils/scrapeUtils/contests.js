import { Browser, Builder,By,until } from "selenium-webdriver";
import { chromeOptions } from "../scrapingConstants.js";

export default async function scrapeContests(page=1,filterTypes="",filterRated="",filterSubstring=""){
    let driver;
    try {
        driver = new Builder().forBrowser(Browser.CHROME).setChromeOptions(chromeOptions).build();
        let requestURL = `https://codeforces.com/contests/page/${page}`;
        let params = [];
        if(filterTypes)
            params.push(`filterTypes=${filterTypes}`);
        if(filterRated)
            params.push(`filterRated=${filterRated}`);
        if(filterSubstring)
            params.push(`filterSubstring=${filterSubstring}`);

        requestURL = requestURL + '?' + params.join('&');
        await driver.get(requestURL);

        const urlLoaded = await driver.getCurrentUrl();
        if(urlLoaded !== requestURL)
            return {error:"Page not available - check the params passed"};

        await driver.wait(until.elementLocated(By.className('datatable')), 10000);

        const upcomingContestElements = await driver.findElements(By.css(".contestList>div>div>table>tbody>tr"));
        const totalUpcomingContests = upcomingContestElements.length;
        console.log("total upcoming contests",totalUpcomingContests);
        let upcoming_currentContests = [];
        for(let i=1; i<totalUpcomingContests; i++){
            let currContest = {};
            const nameElement = await driver.findElement(By.css(`.contestList > div > div > table > tbody > tr:nth-child(${i+1}) > td:first-child`));
            currContest.name = await nameElement.getAttribute("innerText");

            const writerElement = await driver.findElement(By.css(`.contestList > div > div > table > tbody > tr:nth-child(${i+1}) > td:nth-child(2)`));
            currContest.writers = (await writerElement.getAttribute('innerText')).split('\n');
            currContest.writers.pop();

            const startTimeElement = await driver.findElement(By.css(`.contestList > div > div > table > tbody > tr:nth-child(${i+1}) > td:nth-child(3)`));
            currContest.startTime = await startTimeElement.getAttribute('innerText');
           
            const durationElement = await driver.findElement(By.css(`.contestList > div > div > table > tbody > tr:nth-child(${i+1}) > td:nth-child(4)`))
            currContest.duration = await durationElement.getAttribute('innerText');

            upcoming_currentContests.push(currContest);
        }
        console.log(upcoming_currentContests);

        const pastContestElements = await driver.findElements(By.css(".contests-table > div > div > table > tbody > tr"));
        const totalPastContests = pastContestElements.length;
        
        let pastContests = [];
        for(let i=1; i<totalPastContests; i++){
            let currContest = {};
            const nameElement = await driver.findElement(By.css(`.contests-table > div > div > table > tbody > tr:nth-child(${i+1}) > td:first-child`));
            currContest.name = (await nameElement.getAttribute("innerText")).split('\n')[0];

            const writerElement = await driver.findElement(By.css(`.contests-table > div > div > table > tbody > tr:nth-child(${i+1}) > td:nth-child(2)`));
            currContest.writers = (await writerElement.getAttribute('innerText')).split('\n');
            currContest.writers.pop();

            const startTimeElement = await driver.findElement(By.css(`.contests-table > div > div > table > tbody > tr:nth-child(${i+1}) > td:nth-child(3)`));
            currContest.startTime = await startTimeElement.getAttribute('innerText');
            currContest.startTime = new Date(currContest.startTime);

            const durationElement = await driver.findElement(By.css(`.contests-table > div > div > table > tbody > tr:nth-child(${i+1}) > td:nth-child(4)`));
            currContest.duration = await durationElement.getAttribute('innerText');

            const countElement = await driver.findElement(By.css(`.contests-table > div > div > table > tbody > tr:nth-child(${i+1}) > td:nth-child(6)`));
            currContest.acceptedCount = await countElement.getAttribute('innerText');
            currContest.acceptedCount = Number(currContest.acceptedCount.substr(currContest.acceptedCount.indexOf("x")+1));
           
            pastContests.push(currContest);
        }

        return {
            message:"OK",
            page,
            upcoming_currentContests,
            pastContests
        }

    } catch (error) {
        const errorMessage = `Error occured while scraping: ${error.message}`
        console.log(errorMessage);
        return {error:errorMessage};
    }
    finally{
        await driver.quit();
    }
    
}