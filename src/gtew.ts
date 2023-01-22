import { GlobalErrorHandler } from "./classes/globalErrorHandler";

/**
 * @fileoverview GTEW - Global TypeScript Error Wrapper
 * @version 1.0.0
 * @license MPL-2.0
 * @author Jonas Pfalzgraf <info@JosunLP.de>
 * @description
 * GTEW is a global error handler for TypeScript.
 * It is a wrapper for the global error handler.
 * It is a singleton class.
 *
 * @example
 * import GTEW from 'gtew';
 * GTEW.getInstance();
 */
export default class GTEW {
	/**
	 * Instance  of gtew
	 */
	private static instance: GTEW;

	/**
	 * Gets instance
	 * @returns
	 */
	public static getInstance() {
		if (!GTEW.instance) {
			GTEW.instance = new GTEW();
		}
		return GTEW.instance;
	}

	/**
	 * Creates an instance of gtew.
	 */
	private constructor() {
		const globalErrorHandler = GlobalErrorHandler.getInstance();
		globalErrorHandler.init();
	}
}

export { GTEW as GlobalTypeScriptWrittenErrorHandlerWrapper };
export { GTEW as GTEW };
export { GTEW as Gtew };
export { GTEW as gtew };
export { GTEW as g };
export { GTEW as G };
