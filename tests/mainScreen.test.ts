import { remote, Browser } from 'webdriverio';
import { expect } from 'chai';
import { MainPage } from './pages/main.page';

describe('Main Screen Tests', () => {
    let driver: Browser;
    let mainPage: MainPage;

    before(async () => {
        driver = await remote({
            hostname: "localhost",
            port: 4723,
            capabilities: {
                platformName: "Android",
                'appium:automationName': "UiAutomator2",
                'appium:deviceName': "Pixel_8a_API_35",
                'appium:platformVersion': "15",
                'appium:app': `${process.cwd()}/ApiDemos-debug.apk`
            }
        });
        mainPage = new MainPage(driver);
    });

    it('should display the App button on the main screen', async () => {
        try {
            const isDisplayed = await mainPage.isAppButtonDisplayed();
            expect(isDisplayed, 'App button should be displayed on the main screen').to.be.true;
        } catch (error) {
            console.error('Test failed:', error);
            const timestamp = new Date().getTime();
            await driver.saveScreenshot(`./error-main-screen-${timestamp}.png`);
            throw error;
        }
    });

    after(async () => {
        if (driver) {
            await driver.deleteSession();
        }
    });
}); 