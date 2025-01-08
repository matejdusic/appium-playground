import { BasePage } from './base.page';
import { WaitUtil } from '../utils/wait.util';
import { Logger } from '../utils/logger.util';

export class DialogPage extends BasePage {
    constructor(private driver: WebdriverIO.Browser) {
        super(driver);
    }

    // Elements with exact resource IDs from XML
    private get okCancelDialogButton() {
        return this.driver.$('android=new UiSelector().resourceId("io.appium.android.apis:id/two_buttons")');
    }

    private get okCancelLongButton() {
        return this.driver.$('android=new UiSelector().resourceId("io.appium.android.apis:id/two_buttons2")');
    }

    private get okCancelUltraLongButton() {
        return this.driver.$('android=new UiSelector().resourceId("io.appium.android.apis:id/two_buttons2ultra")');
    }

    private get listDialogButton() {
        return this.driver.$('android=new UiSelector().resourceId("io.appium.android.apis:id/select_button")');
    }

    private get progressDialogButton() {
        return this.driver.$('android=new UiSelector().resourceId("io.appium.android.apis:id/progress_button")');
    }

    private get singleChoiceButton() {
        return this.driver.$('android=new UiSelector().resourceId("io.appium.android.apis:id/radio_button")');
    }

    // Dialog elements
    private get dialogMessage() {
        return this.driver.$('android=new UiSelector().resourceId("android:id/alertTitle")');
    }

    private get okButton() {
        return this.driver.$('android=new UiSelector().resourceId("android:id/button1").text("OK")');
    }

    private get cancelButton() {
        return this.driver.$('android=new UiSelector().resourceId("android:id/button2").text("Cancel")');
    }

    // Add missing selectors
    private get textEntryButton() {
        return this.driver.$('android=new UiSelector().resourceId("io.appium.android.apis:id/text_entry_button")');
    }

    private get usernameInput() {
        return this.driver.$('android=new UiSelector().resourceId("io.appium.android.apis:id/username_edit")');
    }

    private get passwordInput() {
        return this.driver.$('android=new UiSelector().resourceId("io.appium.android.apis:id/password_edit")');
    }

    private get dialogTitle() {
        return this.driver.$('android=new UiSelector().resourceId("android:id/alertTitle")');
    }

    async navigateToAlertDialogs() {
        try {
            // Reduce initial wait
            await this.driver.pause(1000);
            
            // Find and click App directly
            const appButton = await this.driver.$('android=new UiSelector().text("App")');
            await WaitUtil.clickElement(appButton);
            
            // Find and click Alert Dialogs immediately
            const alertDialogsButton = await this.driver.$('android=new UiSelector().text("Alert Dialogs")');
            await WaitUtil.clickElement(alertDialogsButton);
            
            // Wait for screen to load
            await WaitUtil.waitForElement(this.okCancelDialogButton);
        } catch (error) {
            Logger.error('Navigation failed', error as Error);
            throw error;
        }
    }

    async openTextEntryDialog() {
        await WaitUtil.clickElement(this.textEntryButton);
        await WaitUtil.waitForElement(this.dialogTitle);
        return this;
    }

    async enterTextAndSubmit(text: string) {
        await this.usernameInput.setValue(text);
        await this.passwordInput.setValue('password123');
        await WaitUtil.clickElement(this.okButton);
        await WaitUtil.waitForElementToDisappear(this.dialogTitle);
        return this;
    }

    async isDialogClosed() {
        try {
            // Check if dialog title is displayed
            return !(await this.dialogTitle.isDisplayed());
        } catch (error) {
            // If element is not found, dialog is closed
            return true;
        }
    }

    // New methods for OK Cancel dialog
    async openOkCancelDialog() {
        try {
            console.log('Opening OK Cancel Dialog...');
            
            // Wait for and click the dialog button
            await this.okCancelDialogButton.waitForDisplayed({ timeout: 5000 });
            await this.okCancelDialogButton.click();
            console.log('Clicked dialog button');
            
            // Wait for dialog title to appear
            await this.dialogMessage.waitForDisplayed({ 
                timeout: 5000,
                timeoutMsg: 'Dialog title did not appear after clicking button'
            });
            
            // Verify both buttons are displayed
            await this.okButton.waitForDisplayed({ timeout: 5000 });
            await this.cancelButton.waitForDisplayed({ timeout: 5000 });
            
            console.log('Dialog opened successfully');
        } catch (error) {
            console.error('Failed to open dialog:', error);
            await this.driver.saveScreenshot('./error-dialog-open.png');
            throw error;
        }
    }

    async getDialogMessage() {
        try {
            // Wait for dialog message
            await this.dialogMessage.waitForDisplayed({ 
                timeout: 5000,
                timeoutMsg: 'Dialog message element not found'
            });
            
            // Get the text
            const message = await this.dialogMessage.getText();
            console.log('Dialog message:', message);
            return message;
        } catch (error) {
            console.error('Failed to get dialog message:', error);
            await this.driver.saveScreenshot('./error-dialog-message.png');
            throw error;
        }
    }

    async waitForDialogToDismiss() {
        try {
            // Wait for dialog message to disappear
            await this.dialogMessage.waitForDisplayed({ 
                timeout: 5000, 
                reverse: true,
                timeoutMsg: 'Dialog did not close after clicking button'
            });
        } catch (error) {
            console.error('Failed waiting for dialog to dismiss:', error);
            await this.driver.saveScreenshot('./error-dialog-dismiss.png');
            throw error;
        }
    }

    async clickOk() {
        try {
            // Wait for and click OK button
            await this.okButton.waitForDisplayed({ 
                timeout: 5000,
                timeoutMsg: 'OK button not found'
            });
            await this.okButton.click();
            console.log('Clicked OK button');
            
            // Wait for dialog to close
            await this.waitForDialogToDismiss();
        } catch (error) {
            console.error('Failed to click OK:', error);
            await this.driver.saveScreenshot('./error-click-ok.png');
            throw error;
        }
    }

    async clickCancel() {
        try {
            // Wait for and click Cancel button
            await this.cancelButton.waitForDisplayed({ 
                timeout: 5000,
                timeoutMsg: 'Cancel button not found'
            });
            await this.cancelButton.click();
            console.log('Clicked Cancel button');
            
            // Wait for dialog to close
            await this.waitForDialogToDismiss();
        } catch (error) {
            console.error('Failed to click Cancel:', error);
            await this.driver.saveScreenshot('./error-click-cancel.png');
            throw error;
        }
    }

    async isDialogDisplayed() {
        try {
            // Check if dialog message is displayed
            return await this.dialogMessage.isDisplayed();
        } catch (e) {
            // If element is not found, dialog is not displayed
            return false;
        }
    }

    private async clickTextEntryButton() {
        await WaitUtil.clickElement(this.textEntryButton);
        Logger.debug('Clicked Text Entry button');
        return this;
    }

    private async waitForDialogToOpen() {
        await WaitUtil.waitForElement(this.dialogTitle);
        Logger.debug('Dialog opened');
        return this;
    }

    private async waitForInputFields() {
        await WaitUtil.waitForElement(this.usernameInput);
        await WaitUtil.waitForElement(this.passwordInput);
        Logger.debug('Input fields ready');
        return this;
    }

    private async enterUsername(text: string) {
        await WaitUtil.waitForElement(this.usernameInput);
        await this.usernameInput.setValue(text);
        Logger.debug(`Entered username: ${text}`);
        return this;
    }

    private async enterPassword(password: string) {
        await WaitUtil.waitForElement(this.passwordInput);
        await this.passwordInput.setValue(password);
        Logger.debug('Entered password');
        return this;
    }

    private async waitForDialogToClose() {
        await WaitUtil.waitForElementToDisappear(this.dialogTitle);
        Logger.debug('Dialog closed');
        return this;
    }
} 