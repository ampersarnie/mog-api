import * as http from 'http';
import Routes from './routes.js';

type RequestListener = {
	(Router: Routes): void;
};

class API {
	host: string = 'localhost';

	port: number = 8080;

	constructor(host: string, port: number) {
		this.host = host;
		this.port = port;
	}

	serve(requestListener: RequestListener) {
		const server = http.createServer((req, res) => {
			console.log('listener');
			const Routing = new Routes(req, res);
			requestListener(Routing);
		});

		server.listen(this.port, () => {
			console.log(`Server is running on http://${this.host}:${this.port}`);
		});

		return this;
	}
}

export default API;
