// eslint-disable-next-line import/extensions
import jsonBody from 'body/json.js';

enum Methods {
	GET = 'GET',
	POST = 'POST',
}

type CallbackFunction = {
	(body: object, request: any): any;
};

type Response = {
	headers?: object;
	code?: number;
	body: any;
};

class Routes {
	requestListener = null;

	res = null;

	req = null;

	constructor(req, res) {
		this.res = res;
		this.req = req;
	}

	isMethod(method: keyof typeof Methods) {
		return method !== this.req.method;
	}

	route(
		method: keyof typeof Methods,
		path: RegExp,
		fn: CallbackFunction,
	): void {
		if (this.isMethod(method)) {
			return;
		}

		switch (method) {
			case Methods.POST:
				this.post(path, fn);
				break;
			case Methods.GET:
			default:
				this.get(path, fn);
				break;
		}
	}

	post(path: RegExp, fn: CallbackFunction): void {
		if (this.isMethod(Methods.POST)) {
			return;
		}

		if (!path.exec(this.req.url)) {
			return;
		}

		jsonBody(this.req, this.res, (err, body: object) => {
			const response = fn(body, this.req);

			this.handleResponse(response);
		});
	}

	async get(path: RegExp, fn: CallbackFunction) {
		if (this.isMethod(Methods.GET)) {
			return;
		}

		if (!path.exec(this.req.url)) {
			return;
		}

		const response = await fn({}, this.req);

		this.handleResponse(response);
	}

	handleResponse(response: Response) {
		Promise.resolve(response).then(() => {
			this.res.setHeader('Content-Type', 'application/json');
			this.res.writeHead(response.code ? response.code : 200);
			this.res.end(JSON.stringify(response.body ? response.body : {}));
		});
	}
}

export default Routes;
