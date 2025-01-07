import { BasePage } from './base.page';

export class DialogPage extends BasePage {
    constructor(private driver: WebdriverIO.Browser) {
        super(driver);
    }

    // Elements with better selectors
    private get appButton() {
        return this.driver.$('android=new UiSelector().description("App")');
    }

    private get alertDialogsButton() {
        return this.driver.$('android=new UiSelector().description("Alert Dialogs")');
    }

    private get textEntryButton() {
        // Try multiple selector strategies
        return this.driver.$('android=new UiSelector().textContains("Text Entry")');
    }

    private get inputField() {
        return this.driver.$('android=new UiSelector().className("android.widget.EditText")');
    }

    private get okButton() {
        return this.driver.$('android=new UiSelector().text("OK")');
    }

    // Actions
    async navigateToAlertDialogs() {
        try {
            console.log('Navigating to App -> Alert Dialogs...');
            await this.appButton.waitForDisplayed({ timeout: 5000 });
            await this.appButton.click();
            
            console.log('Clicked App, waiting for Alert Dialogs...');
            await this.alertDialogsButton.waitForDisplayed({ timeout: 5000 });
            
            // Debug: Print clickable elements one by one
            const elements = await this.driver.$$('android=new UiSelector().clickable(true)');
            for (const element of elements) {
                try {
                    const text = await element.getText();
                    console.log('Found clickable element:', text);
                } catch (e) {
                    // Ignore text retrieval errors
                }
            }
            
            await this.alertDialogsButton.click();
            console.log('Clicked Alert Dialogs');
            
            // Wait for screen transition
            await this.driver.pause(1000);
        } catch (error) {
            console.error('Failed to navigate:', error);
            throw error;
        }
    }

    async openTextEntryDialog() {
        try {
            console.log('Looking for Text Entry dialog button...');
            
            // Debug: Print available elements one by one
            const elements = await this.driver.$$('android=new UiSelector().clickable(true)');
            for (const element of elements) {
                try {
                    const text = await element.getText();
                    console.log('Found button:', text);
                    
                    // If we find the Text Entry dialog button, click it
                    if (text.includes('Text Entry')) {
                        console.log('Found Text Entry button, clicking...');
                        await element.click();
                        
                        // Wait for dialog to appear
                        console.log('Waiting for input field...');
                        await this.inputField.waitForDisplayed({ timeout: 5000 });
                        console.log('Input field is displayed');
                        return;
                    }
                } catch (e) {
                    // Ignore text retrieval errors
                }
            }
            
            throw new Error('Text Entry dialog button not found');
            
        } catch (error) {
            console.error('Failed to open dialog:', error);
            // Take screenshot on failure
            const timestamp = new Date().getTime();
            await this.driver.saveScreenshot(`./error-dialog-${timestamp}.png`);
            throw error;
        }
    }

    async enterTextAndSubmit(text: string) {
        try {
            console.log(`Entering text: "${text}"`);
            await this.inputField.setValue(text);
            
            console.log('Text entered, clicking OK...');
            await this.okButton.click();
            
            // Wait for dialog to disappear
            await this.inputField.waitForDisplayed({ 
                timeout: 3000, 
                reverse: true 
            });
        } catch (error) {
            console.error('Failed to enter text:', error);
            throw error;
        }
    }

    async isDialogClosed() {
        try {
            return !(await this.inputField.isDisplayed());
        } catch (error) {
            // If element is not found, dialog is closed
            return true;
        }
    }
} 