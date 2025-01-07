import { remote, Browser } from 'webdriverio';
import { expect } from 'chai';
import { MainPage } from './pages/main.page';

describe('Animation Tests', () => {
    let driver: Browser;
    let mainPage: MainPage;

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

        mainPage = new MainPage(driver);
    });

    it('should animate bouncing balls on tap', async () => {
        try {
            // Wait for app to load
            await driver.pause(2000);
            
            // Navigate to Bouncing Balls
            await mainPage.navigateToBouncingBalls();

            // Get the bouncing balls container
            const container = await driver.$('android=new UiSelector().className("android.view.View")');
            await container.waitForDisplayed({ timeout: 5000 });
            
            const containerLocation = await container.getLocation();
            const containerSize = await container.getSize();

            // Test center point tap
            const centerPoint = {
                x: Math.floor(containerLocation.x + containerSize.width / 2),
                y: Math.floor(containerLocation.y + containerSize.height / 2)
            };

            console.log(`Tapping at center: x=${centerPoint.x}, y=${centerPoint.y}`);
            
            // Use W3C Actions API instead of touchPerform
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

            // Wait for animation
            await driver.pause(1000);

            // Verify we're still on the right screen
            expect(await container.isDisplayed()).to.be.true;

            // Try another tap point
            const topRight = {
                x: Math.floor(containerLocation.x + containerSize.width * 0.8),
                y: Math.floor(containerLocation.y + containerSize.height * 0.2)
            };

            console.log(`Tapping at top-right: x=${topRight.x}, y=${topRight.y}`);

            // Second tap using W3C Actions API
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

            // Wait for second animation
            await driver.pause(1000);

            // Final verification
            expect(await container.isDisplayed()).to.be.true;

        } catch (error) {
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