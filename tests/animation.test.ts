import { remote, Browser } from 'webdriverio';
import { expect } from 'chai';
import { AnimationPage } from './pages/animation.page';

describe('Animation Tests', () => {
    let driver: Browser;
    let animationPage: AnimationPage;

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
        animationPage = new AnimationPage(driver);
    });

    beforeEach(async () => {
        // Ensure we're on the main screen before each test
        await animationPage.resetToMainScreen();
    });

    it('should animate bouncing balls on tap', async () => {
        try {
            await animationPage.navigateToBouncingBalls();
            
            // Get the bouncing balls container
            const container = await driver.$('android=new UiSelector().className("android.view.View")');
            await container.waitForDisplayed({ timeout: 3000 });
            
            const containerLocation = await container.getLocation();
            const containerSize = await container.getSize();

            // Test center point tap
            const centerPoint = {
                x: Math.floor(containerLocation.x + containerSize.width / 2),
                y: Math.floor(containerLocation.y + containerSize.height / 2)
            };

            console.log(`Tapping at center: x=${centerPoint.x}, y=${centerPoint.y}`);
            
            // Use W3C Actions API for touch
            await driver.performActions([{
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: centerPoint.x, y: centerPoint.y },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pointerUp', button: 0 }
                ]
            }]);

            // Try another tap point
            const topRight = {
                x: Math.floor(containerLocation.x + containerSize.width * 0.8),
                y: Math.floor(containerLocation.y + containerSize.height * 0.2)
            };

            console.log(`Tapping at top-right: x=${topRight.x}, y=${topRight.y}`);
            await driver.performActions([{
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: topRight.x, y: topRight.y },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pointerUp', button: 0 }
                ]
            }]);

            // Verify we're still on the right screen
            expect(await container.isDisplayed()).to.be.true;

        } catch (error) {
            console.error('Test failed:', error);
            const timestamp = new Date().getTime();
            await driver.saveScreenshot(`./error-bouncing-${timestamp}.png`);
            throw error;
        }
    });

    it('should hide button with animation', async () => {
        try {
            await animationPage.navigateToHideShow();
            await animationPage.hideButton();
            expect(await animationPage.isButtonHidden(), 'Button should be hidden').to.be.true;
        } catch (error) {
            console.error('Test failed:', error);
            const timestamp = new Date().getTime();
            await driver.saveScreenshot(`./error-hide-${timestamp}.png`);
            throw error;
        }
    });

    after(async () => {
        if (driver) {
            await driver.deleteSession();
        }
    });
}); 