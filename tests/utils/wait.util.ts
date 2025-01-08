export class WaitUtil {
    // Shorter default timeout
    static DEFAULT_TIMEOUT = 3000;

    static async waitForElement(element: WebdriverIO.Element, timeout = this.DEFAULT_TIMEOUT) {
        await element.waitForDisplayed({ 
            timeout,
            interval: 100, // Check more frequently
            timeoutMsg: `Element ${await element.selector} not displayed after ${timeout}ms`
        });
    }

    static async waitForElementToDisappear(element: WebdriverIO.Element, timeout = this.DEFAULT_TIMEOUT) {
        await element.waitForDisplayed({ 
            timeout, 
            reverse: true,
            interval: 100,
            timeoutMsg: `Element ${await element.selector} still displayed after ${timeout}ms`
        });
    }

    static async clickElement(element: WebdriverIO.Element, timeout = this.DEFAULT_TIMEOUT) {
        await this.waitForElement(element, timeout);
        await element.click();
    }
} 