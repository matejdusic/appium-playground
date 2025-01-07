import { remote, Browser } from 'webdriverio';
import { expect } from 'chai';
import { AnimationPage } from './pages/animation.page';
import { ScreenshotHelper } from './helpers/screenshot.helper';

describe('Default Layout Animations Tests', () => {
    let driver: Browser;
    let animationPage: AnimationPage;

    before(async () => {
        ScreenshotHelper.init();
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
        animationPage = new AnimationPage(driver);
    });

    it('should add 10 buttons with default layout animations', async () => {
        try {
            await animationPage.navigateToDefaultLayoutAnimations();
            await animationPage.addButtons(10);
            const isCorrectCount = await animationPage.verifyButtonsCount(10);
            expect(isCorrectCount, 'There should be 10 buttons added').to.be.true;
        } catch (error) {
            console.error('Test failed:', error);
            await ScreenshotHelper.takeScreenshot(driver, 'default-layout-error');
            throw error;
        }
    });

    after(async () => {
        if (driver) {
            await driver.deleteSession();
        }
    });
}); 