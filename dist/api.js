import * as http from 'http';
import Routes from './routes.js';
class API {
    host = 'localhost';
    port = 8080;
    constructor(host, port) {
        this.host = host;
        this.port = port;
    }
    serve(requestListener) {
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
