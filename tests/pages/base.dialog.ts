export abstract class BaseDialog extends BasePage {
    protected get okButton() {
        return this.driver.$('android=new UiSelector().resourceId("android:id/button1").text("OK")');
    }

    protected get cancelButton() {
        return this.driver.$('android=new UiSelector().resourceId("android:id/button2").text("Cancel")');
    }

    protected get dialogTitle() {
        return this.driver.$('android=new UiSelector().resourceId("android:id/alertTitle")');
    }

    protected async waitForDialogToOpen() {
        await this.dialogTitle.waitForDisplayed({ timeout: 5000 });
    }

    protected async waitForDialogToClose() {
        await this.dialogTitle.waitForDisplayed({ 
            timeout: 5000, 
            reverse: true 
        });
    }

    async isDialogDisplayed() {
        try {
            return await this.dialogTitle.isDisplayed();
        } catch {
            return false;
        }
    }
} 