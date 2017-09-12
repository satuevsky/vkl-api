
class Error{
	/**
	 * Error constructor
	 * @param {Number} code
	 * @param {String} message
	 * @constructor
	 */
	constructor(code, message){
		this.error_code = code;
		this.error_msg = message;
	}

	/**
	 * Add extended params to error
	 * @param {Object} params
	 */
	extend(params){
		let err = new Error(this.error_code, this.error_msg);
		for (let key in params) {
			err[key] = params[key];
		}
		return err;
	}
}

module.exports = Error;