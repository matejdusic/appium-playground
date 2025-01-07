import fs from 'fs';
import path from 'path';

export class ScreenshotHelper {
    private static screenshotDir = 'screenshots';

    static init() {
        // Create screenshots directory if it doesn't exist
        if (!fs.existsSync(this.screenshotDir)) {
            fs.mkdirSync(this.screenshotDir);
        }

        // Clean up old screenshots
        this.cleanScreenshots();
    }

    static async takeScreenshot(driver: WebdriverIO.Browser, name: string) {
        const timestamp = new Date().getTime();
        const filename = path.join(this.screenshotDir, `${name}-${timestamp}.png`);
        await driver.saveScreenshot(filename);
        console.log(`Screenshot saved: ${filename}`);
    }

    private static cleanScreenshots() {
        const files = fs.readdirSync(this.screenshotDir);
        for (const file of files) {
            fs.unlinkSync(path.join(this.screenshotDir, file));
        }
        console.log('Cleaned up old screenshots');
    }
} 