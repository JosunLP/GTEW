/**
 * Local db
 * @class LocalDb
 * @example
 * import { LocalDb } from 'gtew';
 * LocalDb.getInstance
 * @description
 * Local db
 * @methods
 * getInstance() - Gets instance |
 * get(key: string) - Gets value from localDb |
 * set(key: string, value: string) - Sets value to localDb
 */
export class LocalDb {
	/**
	 * Instance  of localDb
	 */
	private static instance: LocalDb;

	private readonly LOCAL_DB_KEY: string = "gtew_";

	/**
	 * Gets instance
	 * @returns
	 * @memberof LocalDb
	 * @static
	 * @method getInstance
	 * @public
	 * @returns {LocalDb}
	 * @example
	 * LocalDb.getInstance();
	 */
	public static getInstance() {
		if (!LocalDb.instance) {
			LocalDb.instance = new LocalDb();
		}
		return LocalDb.instance;
	}

	/**
	 * Creates an instance of localDb.
	 * @memberof LocalDb
	 * @constructor
	 * @private
	 */
	private constructor() {}

	/**
	 * Gets value from localDb
	 * @param key
	 * @returns
	 * @memberof LocalDb
	 * @method get
	 * @public
	 * @returns {string}
	 * @example
	 * LocalDb.getInstance().get('key');
	 */
	public get(key: string): string {
		let result: string;
		try {
			result = <string>localStorage.getItem(this.LOCAL_DB_KEY + key);
		} catch (error) {
			result = "DB mapping error: The key does not exist.";
		}
		return result;
	}

	/**
	 * Sets value to localDb
	 * @param key
	 * @param value
	 * @memberof LocalDb
	 * @method set
	 * @public
	 * @returns {void}
	 * @example
	 * LocalDb.getInstance().set('key', 'value');
	 */
	public set(key: string, value: string): void {
		try {
			this.remove(this.LOCAL_DB_KEY + key);
		} catch (err) {}

		localStorage.setItem(this.LOCAL_DB_KEY + key, value);
	}

	/**
	 * Removes local db entry
	 * @param key
	 * @memberof LocalDb
	 * @method remove
	 * @public
	 * @returns {void}
	 * @example
	 * LocalDb.getInstance().remove('key');
	 */
	public remove(key: string): void {
		try {
			localStorage.removeItem(this.LOCAL_DB_KEY + key);
		} catch (err) {
			console.error(err);
		}
	}

	/**
	 * Clears local db
	 * @memberof LocalDb
	 * @method clear
	 * @public
	 * @returns {void}
	 * @example
	 * LocalDb.getInstance().clear();
	 */
	public clear(): void {
		try {
			localStorage.clear();
		} catch (err) {
			console.error(err);
		}
	}

	/**
	 * Gets keys
	 * @returns keys
	 */
	public getKeys(): string[] {
		const keys: string[] = [];
		for (let i = 0; i < localStorage.length; i++) {
			let key = <string>localStorage.key(i);
			if (key.startsWith(this.LOCAL_DB_KEY)) {
				key = key.replace(this.LOCAL_DB_KEY, "");
				keys.push(key);
			}
		}
		return keys;
	}
}
