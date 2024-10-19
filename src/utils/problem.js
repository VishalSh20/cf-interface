import { Builder, By, until } from 'selenium-webdriver';

export default async function scrapeProblem(contestId,problemId) {
    // Set up Selenium to use ChromeDriver
    let driver =new Builder().forBrowser('chrome').build();

    try {
        // Navigate to the Codeforces problem page
        await driver.get(`https://codeforces.com/contest/${contestId}/problem/${problemId}`);

        // Wait for the page to load fully and the title to be available
        await driver.wait(until.elementLocated(By.className('title')), 10000);

        // give title
        const titleElement = await driver.findElement(By.className('title'));
        const title = await titleElement.getText();

        // only the statement
        const problemStatementElement = await driver.findElement(By.css('.problem-statement > div:nth-child(2)'));
        const problemStatement = await problemStatementElement.getAttribute('innerText');

        // getting input and output specification strings
        const inputSpecificationElement = await driver.findElement(By.className("input-specification"));
        const inputSpecification = await inputSpecificationElement.getAttribute('innerText');
        
        const outputSpecificationElement = await driver.findElement(By.className("output-specification"));
        const outputSpecification = await outputSpecificationElement.getAttribute('innerText');
        
        // taking the sample testcases
        const sampleInputElements = await driver.findElements(By.css('.sample-test > .input > pre'));
        let sampleInputs = [];
        for(let i=0; i<sampleInputElements.length; i++){
            const input = await sampleInputElements[i].getAttribute('innerText');
            sampleInputs.push(input.trim());
        }
    
        const sampleOutputElements = await driver.findElements(By.css('.sample-test > .output > pre'));
        let sampleOutputs = [];
        for(let i=0; i<sampleOutputElements.length; i++){
            const output = await sampleOutputElements[i].getAttribute('innerText');
            sampleOutputs.push(output.trim());
        }

        let sampleTestCases = [];
        for(let i=0; i<sampleInputElements.length; i++){
           sampleTestCases.push({input:sampleInputs[i],output:sampleOutputs[i]});
        }

        // getting the time and memory limit
        const timeLimitElement = await driver.findElement(By.className('time-limit'));
        const timeLimitText = await timeLimitElement.getText();
        let timeLimit = "";
        for(let i=0; i<timeLimitText.length; i++){
            if((timeLimitText[i] >='0' && timeLimitText[i]<='9') || timeLimitText[i]=='.')
                timeLimit += timeLimitText[i];
        }
    

        const memoryLimitElement = await driver.findElement(By.className('memory-limit'));
        const memoryLimitText = await memoryLimitElement.getText();
        let memoryLimit = "";
        for(let i=0; i<memoryLimitText.length; i++){
            if((memoryLimitText[i] >='0' && memoryLimitText[i]<='9') || memoryLimitText[i]=='.')
                memoryLimit += memoryLimitText[i];
        }

        // console.log("Problem Title:", title);
        // console.log("Problem Statement:", problemStatement);
        // console.log("Time Limit:", timeLimit);
        // console.log("Memory Limit:", memoryLimit);

        // Return the scraped data
        return {
           problem:{ title,
            problemStatement,
            inputSpecification,
            outputSpecification,
            sampleTestCases,
            timeLimit:Number(timeLimit),
            memoryLimit:Number(memoryLimit)},
            error:null
        };
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        // Close the browser
        await driver.quit();
    }
}


