export class ScreenshotHelper {
    constructor(private driver: WebdriverIO.Browser) {}

    async takeScreenshot(name: string) {
        const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');
        const filename = `${name}_${timestamp}.png`;
        await this.driver.saveScreenshot(`./screenshots/${filename}`);
        console.log(`Screenshot saved: ${filename}`);
    }
} 