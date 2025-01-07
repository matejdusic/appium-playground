export class MainPage {
    constructor(private driver: WebdriverIO.Browser) {}

    // Elements
    private get animationButton() {
        return this.driver.$('android=new UiSelector().text("Animation")');
    }

    private get bouncingBallsButton() {
        return this.driver.$('android=new UiSelector().text("Bouncing Balls")');
    }

    // Actions
    async navigateToBouncingBalls() {
        try {
            console.log('Navigating to Animation section...');
            await this.animationButton.waitForDisplayed({ timeout: 5000 });
            await this.animationButton.click();
            
            console.log('Navigating to Bouncing Balls...');
            await this.bouncingBallsButton.waitForDisplayed({ timeout: 5000 });
            await this.bouncingBallsButton.click();
            
            // Wait for transition
            await this.driver.pause(500);
        } catch (error) {
            console.error('Navigation failed:', error);
            throw error;
        }
    }
} 