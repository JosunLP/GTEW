import { BrowserLogHandler } from './browserLogHandler';
import { T } from "simple-toast-messages";
import { GtewError } from '../types/customError';

/**
 * Global error handler
 * @class GlobalErrorHandler
 * @description
 * Global error handler
 *
 * @methods
 * getInstance() - Gets instance |
 * init() - Inits global error handler
 */
export class GlobalErrorHandler {
	/**
	 * Instance  of global error handler
	 */
	private static instance: GlobalErrorHandler;

	private readonly blh = BrowserLogHandler.getInstance();

	/**
	 * Gets instance
	 * @returns
	 * @memberof GlobalErrorHandler
	 * @static
	 * @method getInstance
	 * @public
	 * @returns {GlobalErrorHandler}
	 * @example
	 * GlobalErrorHandler.getInstance();
	 */
	public static getInstance() {
		if (!GlobalErrorHandler.instance) {
			GlobalErrorHandler.instance = new GlobalErrorHandler();
		}
		return GlobalErrorHandler.instance;
	}

	/**
	 * Creates an instance of global error handler.
	 */
	private constructor() {}

	/**
	 * Handles error
	 * @param errorEvent
	 * @returns
	 * @memberof GlobalErrorHandler
	 */
	private async handleError(errorEvent: ErrorEvent): Promise<void> {
		const error: GtewError = {
			message: errorEvent.message,
			filename: errorEvent.filename,
			lineno: errorEvent.lineno,
			colno: errorEvent.colno,
			stack: errorEvent.error?.stack,
		};
		const message = this.createErrorMessage(errorEvent);
		this.blh.log(message);
		console.error(message, error);
	}

	/**
	 * Creates error message
	 * @param error
	 * @returns error message
	 */
	private createErrorMessage(error: ErrorEvent): string {
		const errorMessageBase = `Error: ${error.message} in ${error.filename} at line ${error.lineno} and column ${error.colno}`;
		return errorMessageBase;
	}

	/**
	 * Inits global error handler
	 */
	public init(): void {
		if (typeof window !== "undefined") {
			window.onerror = ((errorEvent: ErrorEvent): void => {
				this.handleError(errorEvent);
				const msg = T.getInstance();
				msg.error("An error occurred: "+ errorEvent.message, 5000);
			}) as OnErrorEventHandler;
		} else {
			process.on("uncaughtException", (error: Error): void => {
				this.handleError(this.errorToErrorEvent(error));
			});
		}
	}

	/**
	 * Errors to error event
	 * @param error
	 * @returns to error event
	 */
	private errorToErrorEvent(error: Error): ErrorEvent {
		return {
			message: error.message,
			filename: "Unknown",
			lineno: 0,
			colno: 0,
			error: error,
		} as ErrorEvent;
	}
}
