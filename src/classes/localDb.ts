import PouchDB from "pouchdb";

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

	/**
	 * Local db key of local db
	 */
	private readonly LOCAL_DB_KEY: string = "gtew_";

	/**
	 * Local db of local db
	 */
	private LOCAL_DB: PouchDB.Database = new PouchDB("gtew");

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
	public get(key: string): string	 {
		let result: string = "";
		this.LOCAL_DB.get(this.LOCAL_DB_KEY + key)
			.catch(() => {
				return { value: "" };
			})
			.then((doc) => {
				// @ts-ignore
				result = doc.value;
			});
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
		this.LOCAL_DB.get(this.LOCAL_DB_KEY + key)
			.then((doc) => {
				this.LOCAL_DB.remove(doc);
			})
			.catch();

		this.LOCAL_DB.put({
			_id: this.LOCAL_DB_KEY + key,
			value: value,
		});
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
		this.LOCAL_DB.get(this.LOCAL_DB_KEY + key)
			.then((doc) => {
				this.LOCAL_DB.remove(doc);
			})
			.catch();
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
		this.LOCAL_DB.destroy();
		this.LOCAL_DB = new PouchDB("gtew");
	}

	/**
	 * Gets keys
	 * @returns keys
	 */
	public getKeys(): string[] {
		const keys: string[] = [];
		this.LOCAL_DB.getIndexes().then((result) => {
			result.indexes.forEach((index) => {
				if (index.name.startsWith(this.LOCAL_DB_KEY)) {
					keys.push(index.name.replace(this.LOCAL_DB_KEY, ""));
				}
			});
		});
		return keys;
	}
}
