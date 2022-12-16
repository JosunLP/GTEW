/**
 * Logfile
 */
export class Logfile {
	/**
	 * Filename  of logfile
	 */
	public filename: string;
	/**
	 * Content  of logfile
	 */
	public content: string;
	/**
	 * Date  of logfile
	 */
	public changeDate: Date;

	/**
	 * Creates an instance of logfile.
	 * @param filename
	 * @param content
	 * @param date
	 */
	constructor(
		filename: string,
		content: string,
		changeDate: Date
	) {
		this.filename = filename;
		this.content = content;
		this.changeDate = changeDate;
	}
}
