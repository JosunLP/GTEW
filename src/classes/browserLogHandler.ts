import { Logfile } from "./../models/logfile";
import { LocalDb } from "./localDb";

/**
 * Browser log handler
 */
export class BrowserLogHandler {
	/**
	 * Instance  of browser log handler
	 */
	private static instance: BrowserLogHandler;

	/**
	 * Db  of browser log handler
	 */
	private readonly db = LocalDb.getInstance();

	/**
	 * Creates an instance of browser log handler.
	 */
	private constructor() {}

	/**
	 * Gets instance
	 * @returns
	 */
	public static getInstance() {
		if (!BrowserLogHandler.instance) {
			BrowserLogHandler.instance = new BrowserLogHandler();
		}
		return BrowserLogHandler.instance;
	}

	/**
	 * Logs browser log handler
	 * @param message
	 * @returns log
	 */
	public async log(message: string): Promise<void> {
		const logPrefix = this.generateLogPrefix();
		const logMessage = `${logPrefix} ${message}`;
		const logFileName = this.getLogFileName();
		const logFile = this.getLogFile(logFileName);

		if (logFile.content === "") {
			logFile.content = logMessage;
		} else {
			logFile.content += `\n${logMessage}`;
		}
	}

	/**
	 * Generates log prefix
	 * @returns log prefix
	 */
	private generateLogPrefix(): string {
		return `[${new Date().toISOString()}] [${this.generateGuid()}]: `;
	}

	/**
	 * Gets log file
	 * @param name
	 * @returns log file
	 */
	private getLogFile(name: string): Logfile {
		if (this.db.get(name)) {
			const logFile = this.db.get(name)! as Logfile;
			return logFile;
		}
		const logFileName = this.getLogFileName();
		return new Logfile(logFileName, "", new Date());
	}

	/**
	 * Gets log file name
	 * @returns
	 */
	private getLogFileName() {
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		return `${year}-${month}-${day}.log`;
	}

	/**
	 * Generates guid
	 * @returns
	 */
	private generateGuid() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
			/[xy]/g,
			function (c) {
				const r = (Math.random() * 16) | 0,
					v = c == "x" ? r : (r & 0x3) | 0x8;
				return v.toString(16);
			}
		);
	}

	/**
	 * Gets logs
	 * @returns logs
	 */
	public async getLogs(): Promise<Logfile[]> {
		const logFiles: Logfile[] = [];
		const logFileNames = this.db.getKeys();
		for (let i = 0; i < logFileNames.length; i++) {
			const logFileName = <string>logFileNames[i];
			const logFile = this.getLogFile(logFileName);
			logFiles.push(logFile);
		}
		return logFiles;
	}
}
