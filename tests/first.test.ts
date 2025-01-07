import { remote, Browser } from 'webdriverio';
import { expect } from 'chai';

describe('My First Appium Test', () => {
    let driver: Browser;

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
    });

    it('should click on Accessibility', async () => {
        try {
            // Wait for app to load
            await driver.pause(2000);

            // Find and click Accessibility
            const accessibilityBtn = await driver.$('android=new UiSelector().text("Accessibility")');
            await accessibilityBtn.waitForDisplayed({ timeout: 5000 });
            await accessibilityBtn.click();

            // Wait for navigation
            await driver.pause(1000);

            // Verify we're on the right screen by checking for a known element
            const customView = await driver.$('android=new UiSelector().text("Custom View")');
            await customView.waitForDisplayed({ timeout: 5000 });
            expect(await customView.isDisplayed()).to.be.true;

        } catch (error) {
            console.error('Error in test:', error);
            throw error;
        }
    });

    after(async () => {
        if (driver) {
            await driver.deleteSession();
        }
    });
});
