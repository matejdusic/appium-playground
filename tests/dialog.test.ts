import { remote, Browser } from 'webdriverio';
import { expect } from 'chai';
import { DialogPage } from './pages/dialog.page';

describe('Dialog Tests', () => {
    let driver: Browser;
    let dialogPage: DialogPage;

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
        dialogPage = new DialogPage(driver);
    });

    it('should enter text in a dialog and verify result', async () => {
        try {
            // Navigate through the app
            await dialogPage.navigateToAlertDialogs();
            
            // Debug: Take screenshot of the current screen
            await driver.saveScreenshot('./before-dialog.png');
            console.log('Current screen content:', await driver.getPageSource());
            
            // Open the dialog and enter text
            await dialogPage.openTextEntryDialog();
            const testText = 'Hello Appium!';
            await dialogPage.enterTextAndSubmit(testText);
            
            // Verify dialog is closed
            expect(await dialogPage.isDialogClosed(), 'Dialog should be closed after clicking OK').to.be.true;

        } catch (error) {
            // Take screenshot on failure
            const timestamp = new Date().getTime();
            await driver.saveScreenshot(`./error-${timestamp}.png`);
            console.error('Test failed:', error);
            throw error;
        }
    });

    after(async () => {
        if (driver) {
            await driver.deleteSession();
        }
    });
}); 