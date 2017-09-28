const Error = require('./Error');

module.exports = {
	unknownError: new Error(1, "Unknown error"),
	appDisabledError: new Error(2, "This application is turned off"),
	unknownMethodError: new Error(3, "Unknown method passed"),
	invalidSigError: new Error(4, "Incorrect signature"),
	authError: new Error(5, "Authorization failed"),
	tooManyRequestsError: new Error(6, "Too many requests"),
	permissionsError: new Error(7, "Permissions denied"),
	invalidRequestError: new Error(8, "Invalid request"),
	tooManySameRequestsError: new Error(9, "Too many requests of the same type"),
	internalError: new Error(10, "Internal error"),
	captchaError: new Error(14, "Captcha needed"),
	invalidParamsError: new Error(100, "Invalid params"),
};