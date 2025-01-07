import { BasePage } from './base.page';

export class AnimationPage extends BasePage {
    // Elements
    private get hideShowButton() {
        return this.driver.$('android=new UiSelector().text("Hide-Show Animations")');
    }

    private get bouncingBallsButton() {
        return this.driver.$('android=new UiSelector().text("Bouncing Balls")');
    }

    private get button0() {
        return this.driver.$('android=new UiSelector().text("0")');
    }

    private get defaultLayoutAnimationsButton() {
        return this.driver.$('android=new UiSelector().text("Default Layout Animations")');
    }

    private get addButton() {
        return this.driver.$('android=new UiSelector().resourceId("io.appium.android.apis:id/addNewButton")');
    }

    private get buttonsContainer() {
        return this.driver.$('android=new UiSelector().resourceId("io.appium.android.apis:id/ll")');
    }

    private get gridContainer() {
        return this.driver.$('android=new UiSelector().resourceId("io.appium.android.apis:id/gridContainer")');
    }

    private async getAddedButtons() {
        // Find buttons by their numeric text values
        return this.driver.$$('android=new UiSelector().className("android.widget.Button").textMatches("^\\d+$")');
    }

    // Actions
    async navigateToBouncingBalls() {
        try {
            console.log('Navigating to Animation section...');
            await this.navigateToSection('Animation');
            
            console.log('Looking for Bouncing Balls button...');
            await this.bouncingBallsButton.waitForDisplayed({ timeout: 3000 });
            
            console.log('Clicking Bouncing Balls...');
            await this.bouncingBallsButton.click();
        } catch (error) {
            console.error('Failed to navigate to Bouncing Balls:', error);
            throw error;
        }
    }

    async navigateToHideShow() {
        try {
            console.log('Navigating to Animation section...');
            await this.navigateToSection('Animation');
            
            console.log('Looking for Hide-Show Animations button...');
            await this.hideShowButton.waitForDisplayed({ timeout: 3000 });
            
            console.log('Clicking Hide-Show Animations...');
            await this.hideShowButton.click();
        } catch (error) {
            console.error('Failed to navigate to Hide-Show:', error);
            throw error;
        }
    }

    async hideButton() {
        try {
            console.log('Waiting for button 0...');
            await this.button0.waitForDisplayed({ timeout: 3000 });
            await this.button0.click();
        } catch (error) {
            console.error('Failed to hide button:', error);
            throw error;
        }
    }

    async isButtonHidden() {
        try {
            return !(await this.button0.isDisplayed());
        } catch (e) {
            return true;
        }
    }

    async resetToMainScreen() {
        await this.goToMainScreen();
    }

    async navigateToDefaultLayoutAnimations() {
        try {
            console.log('Navigating to Animation section...');
            await this.navigateToSection('Animation');
            
            console.log('Looking for Default Layout Animations button...');
            await this.defaultLayoutAnimationsButton.waitForDisplayed({ timeout: 3000 });
            
            console.log('Clicking Default Layout Animations...');
            await this.defaultLayoutAnimationsButton.click();
        } catch (error) {
            console.error('Failed to navigate to Default Layout Animations:', error);
            throw error;
        }
    }

    async addButtons(count: number) {
        try {
            for (let i = 0; i < count; i++) {
                console.log(`Clicking Add button: ${i + 1}`);
                await this.addButton.click();
                
                // Wait for the new button count to match
                await this.driver.waitUntil(async () => {
                    const buttons = await this.getAddedButtons();
                    console.log(`Current button count: ${buttons.length}`);
                    return buttons.length >= (i + 1);
                }, {
                    timeout: 5000,
                    interval: 500,
                    timeoutMsg: `Button ${i + 1} was not added after 5 seconds`
                });
                
                // Verify the last added button has correct text
                const buttons = await this.getAddedButtons();
                const lastButton = buttons[buttons.length - 1];
                const buttonText = await lastButton.getText();
                console.log(`Last button text: ${buttonText}`);
                
                // Small pause to allow animation
                await this.driver.pause(500);
            }
        } catch (error) {
            console.error('Failed to add buttons:', error);
            console.log('Current page source:', await this.driver.getPageSource());
            throw error;
        }
    }

    async verifyButtonsCount(expectedCount: number) {
        try {
            console.log('Waiting for buttons to be present...');
            await this.driver.waitUntil(async () => {
                const buttons = await this.getAddedButtons();
                return buttons.length > 0;
            }, {
                timeout: 5000,
                interval: 500,
                timeoutMsg: 'No buttons found after 5 seconds'
            });

            const buttons = await this.getAddedButtons();
            const actualCount = buttons.length;
            console.log(`Expected ${expectedCount} buttons, found ${actualCount}`);

            // Print text of each button for debugging
            for (let i = 0; i < buttons.length; i++) {
                try {
                    const text = await buttons[i].getText();
                    console.log(`Button ${i + 1} text: ${text}`);
                } catch (e) {
                    console.log(`Could not get text for button ${i + 1}`);
                }
            }

            return actualCount === expectedCount;
        } catch (error) {
            console.error('Failed to verify buttons count:', error);
            console.log('Current page source:', await this.driver.getPageSource());
            throw error;
        }
    }
} 