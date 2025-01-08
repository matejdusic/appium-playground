export class Logger {
    static debug(message: string) {
        console.log(`[DEBUG] ${message}`);
    }

    static error(message: string, error?: Error) {
        console.error(`[ERROR] ${message}`, error);
    }

    static info(message: string) {
        console.log(`[INFO] ${message}`);
    }
} 