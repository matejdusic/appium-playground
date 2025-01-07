import { BasePage } from './base.page';

export class MainPage extends BasePage {
    private get appButton() {
        return this.driver.$('android=new UiSelector().text("App")');
    }

    async isAppButtonDisplayed() {
        try {
            return await this.appButton.isDisplayed();
        } catch (e) {
            return false;
        }
    }
} 