const { Builder, By, xpath, Key, until } = require('selenium-webdriver');

async function runTestInMultipleBrowsers() {
    const chromeDriver = await new Builder().forBrowser('chrome').build();
    const firefoxDriver = await new Builder().forBrowser('firefox').build();

    try {
        await Promise.all([
            executeTest(chromeDriver, 'Chrome'),
            executeTest(firefoxDriver, 'Firefox')
        ]);
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await chromeDriver.quit();
        await firefoxDriver.quit();
    }
}

async function executeTest(driver, browserName) {
    let search = "//a[@id='login2']"
    try {

        await driver.get('https://demoblaze.com/');
        await driver.findElement(By.xpath(search)).click()
        console.log(`Test passed in ${browserName}`);

    } catch (error) {
        throw new Error(`Test failed in ${browserName}: ${error}`);
    }
}

runTestInMultipleBrowsers();