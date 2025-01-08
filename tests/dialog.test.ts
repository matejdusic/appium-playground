import { remote, Browser } from 'webdriverio';
import { expect } from 'chai';
import { DialogPage } from './pages/dialog.page';
import { ScreenshotHelper } from './helpers/screenshot.helper';

describe('Dialog Tests', () => {
    let driver: Browser;
    let dialogPage: DialogPage;

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
                'appium:app': `${process.cwd()}/ApiDemos-debug.apk`,
                'appium:noReset': false,
                'appium:fullReset': false
            }
        });
        // Add initial wait for app to load
        await driver.pause(2000);
        dialogPage = new DialogPage(driver);
    });

    beforeEach(async () => {
        try {
            // Reset app state before each test using restartApp
            await driver.startActivity('io.appium.android.apis', 'io.appium.android.apis.ApiDemos');
            
            // Wait for app to restart
            await driver.pause(3000);
            
            // Navigate to Alert Dialogs
            await dialogPage.navigateToAlertDialogs();
        } catch (error) {
            console.error('Failed in beforeEach:', error);
            await driver.saveScreenshot('./error-before-each.png');
            throw error;
        }
    });

    it('should handle OK Cancel dialog with message', async () => {
        try {
            // Open dialog and verify message
            await dialogPage.openOkCancelDialog();
            const message = await dialogPage.getDialogMessage();
            expect(message, 'Dialog message should not be empty').to.not.be.empty;
            expect(message).to.include('Lorem ipsum dolor');
            
            // Verify dialog is displayed
            expect(await dialogPage.isDialogDisplayed()).to.be.true;

            // Click OK and verify dialog closes
            await dialogPage.clickOk();
            await dialogPage.waitForDialogToDismiss();
            expect(await dialogPage.isDialogDisplayed()).to.be.false;

            // Open dialog again
            await dialogPage.openOkCancelDialog();
            expect(await dialogPage.isDialogDisplayed()).to.be.true;

            // Click Cancel and verify dialog closes
            await dialogPage.clickCancel();
            await dialogPage.waitForDialogToDismiss();
            expect(await dialogPage.isDialogDisplayed()).to.be.false;
        } catch (error) {
            console.error('Test failed:', error);
            await ScreenshotHelper.takeScreenshot(driver, 'ok-cancel-dialog-error');
            throw error;
        }
    });

    it('should enter text in a dialog and verify result', async () => {
        try {
            // Open the dialog and enter text
            await dialogPage.openTextEntryDialog();
            const testText = 'Hello Appium!';
            await dialogPage.enterTextAndSubmit(testText);
            
            // Verify dialog is closed
            expect(await dialogPage.isDialogClosed(), 'Dialog should be closed after clicking OK').to.be.true;
            
            // Take screenshot of result
            await ScreenshotHelper.takeScreenshot(driver, 'text-entry-result');
        } catch (error) {
            console.error('Test failed:', error);
            await ScreenshotHelper.takeScreenshot(driver, 'text-entry-error');
            throw error;
        }
    });

    after(async () => {
        if (driver) {
            await driver.deleteSession();
        }
    });
}); 