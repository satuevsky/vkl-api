const {unknownMethodError} = require('./defaultErrors');

/**
 * @param {*} [context] - it will be passed to every request as req.context
 * @param io - socket.io server
 */
function vklServer({context, io} = {}){
	let methods = {},
		middlewares = [];

	function execMethod(method, req, res){
		req.method = method;
		req.context = context;

		loop(0);

		function loop(i){
			if(i < middlewares.length){
				middlewares[i](req, res, () => {
					loop(i+1);
				})
			}else{
				method.execute(req, res);
			}
		}
	}

	function apiHandler(req, res) {
		res.ok = data => res.json({response: data || null});
		res.error = error => res.json({error});

		let path = req.url.split('?')[0],
			method = methods[path];

		if(!method){
			res.error(unknownMethodError);
		}else{
			execMethod(method, req, res);
		}
	}

	/**
	 * Add middleware
	 * @param {Function} middleware
	 */
	apiHandler.use = (middleware) => {
		middlewares.push(middleware);
		return apiHandler;
	};

	/**
	 * Add method to API
	 * @param {Method} method
	 * @param {string} [path]
	 */
	apiHandler.addMethod = (method, path) => {
		path = path || '/' + method.name;
		methods[path] = method;
		return apiHandler;
	};

	if(io){
		io.on('connection', (socket) => {
			socket.on('api', (data, fn) => {
				onRequest(socket, data, fn);
			})
		});
		function onRequest(socket, data, fn) {
			let req = {query: data, socket: socket},
				res = {json: fn};
			apiHandler(req, res);
		}
	}

	return apiHandler;
}

module.exports = vklServer;