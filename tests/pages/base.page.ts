export class BasePage {
    constructor(protected driver: WebdriverIO.Browser) {}

    protected async waitForElement(selector: string, timeout = 3000) {
        const element = await this.driver.$(selector);
        await element.waitForDisplayed({ timeout });
        return element;
    }

    protected async clickElement(selector: string) {
        const element = await this.waitForElement(selector);
        await element.click();
    }

    protected async findClickableByText(searchText: string): Promise<WebdriverIO.Element | null> {
        const elements = await this.driver.$$('android=new UiSelector().clickable(true)');
        for (const element of elements) {
            try {
                const text = await element.getText();
                if (text.includes(searchText)) {
                    return element;
                }
            } catch (e) {
                // Ignore text retrieval errors
            }
        }
        return null;
    }

    protected async navigateToSection(sectionName: string) {
        const element = await this.findClickableByText(sectionName);
        if (!element) {
            throw new Error(`Section "${sectionName}" not found`);
        }
        await element.click();
    }

    protected async goBack() {
        console.log('Going back to previous screen...');
        await this.driver.back();
    }

    protected async goToMainScreen() {
        console.log('Returning to main screen...');
        // Keep pressing back until we find the "Animation" button on main screen
        for (let i = 0; i < 3; i++) {
            try {
                const mainScreenElement = await this.driver.$('android=new UiSelector().text("Animation")');
                if (await mainScreenElement.isDisplayed()) {
                    return;
                }
                await this.driver.back();
                // Small wait after pressing back
                await this.driver.pause(500);
            } catch (e) {
                await this.driver.back();
            }
        }
    }
} 