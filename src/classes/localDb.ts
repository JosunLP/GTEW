import { Logfile } from "./../models/logfile";
import { DbEntry } from "./../types/dbEntry";
import { Database } from "../types/database";

/**
 * Local db
 * @class LocalDb
 * @example
 * import { LocalDb, GTEW } from 'gtew';
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
	 * Local db of local db
	 */
	private readonly LOCAL_DB_STORAGE_KEY: string = "gtew";

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
	 * Creates db
	 * @memberof LocalDb
	 * @method createDb
	 * @private
	 * @returns {void}
	 * @example
	 * LocalDb.getInstance().createDb();
	 */
	private createDb(): void {
		window.localStorage.setItem(this.LOCAL_DB_STORAGE_KEY, "[]");
	}

	/**
	 * Gets all
	 * @returns all
	 * @memberof LocalDb
	 * @method getAll
	 * @public
	 * @returns {Logfile[]}
	 * @example
	 * LocalDb.getInstance().getAll();
	 */
	public getAll(): Logfile[] {
		let result: Logfile[] = [];
		try {
			const db = JSON.parse(
				window.localStorage.getItem(this.LOCAL_DB_STORAGE_KEY)!
			);
			db.forEach((dbEntry: DbEntry) => {
				result.push(dbEntry.data);
			});
		} catch (error) {
			this.createDb();
			result = [];
		}
		return result;
	}

	public get(key: string): Logfile | false {
		let result: Logfile | false = false;
		try {
			const db = JSON.parse(
				window.localStorage.getItem(this.LOCAL_DB_STORAGE_KEY)!
			);
			result = db.find((item: DbEntry) => item.id === key).data;
		} catch (error) {
			this.createDb();
			result = false;
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
	public set(key: string, value: Logfile): void {
		let db: Database = [];
		try {
			db = JSON.parse(
				window.localStorage.getItem(this.LOCAL_DB_STORAGE_KEY)!
			);
		} catch (error) {
			this.createDb();
		}
		db.push({ id: key, data: value } as DbEntry);
		window.localStorage.setItem(
			this.LOCAL_DB_STORAGE_KEY,
			JSON.stringify(db)
		);
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
		let db: Database = [];
		try {
			db = JSON.parse(
				window.localStorage.getItem(this.LOCAL_DB_STORAGE_KEY)!
			);
		} catch (error) {
			this.createDb();
		}
		db = db.filter((item: DbEntry) => item.id !== key);
		window.localStorage.setItem(
			this.LOCAL_DB_STORAGE_KEY,
			JSON.stringify(db)
		);
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
		window.localStorage.removeItem(this.LOCAL_DB_STORAGE_KEY);
		this.createDb();
	}

	/**
	 * Gets keys
	 * @returns keys
	 */
	public getKeys(): string[] {
		const keys: string[] = [];
		try {
			const db = JSON.parse(
				window.localStorage.getItem(this.LOCAL_DB_STORAGE_KEY)!
			);
			db.forEach((dbEntry: DbEntry) => {
				keys.push(dbEntry.id);
			});
		} catch (error) {
			this.createDb();
		}
		return keys;
	}
}
