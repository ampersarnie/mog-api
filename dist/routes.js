import jsonBody from 'body/json';
var Methods;
(function (Methods) {
    Methods["GET"] = "GET";
    Methods["POST"] = "POST";
})(Methods || (Methods = {}));
class Routes {
    requestListener = null;
    res = null;
    req = null;
    constructor(req, res) {
        this.res = res;
        this.req = req;
    }
    route(method, path, fn) {
        if (method !== this.req.method) {
            return;
        }
        switch (method) {
            case 'POST':
                this.post(path, fn);
                break;
            case 'GET':
            default:
                this.get(path, fn);
                break;
        }
    }
    post(path, fn) {
        if (!path.exec(this.req.url)) {
            return;
        }
        jsonBody(this.req, this.res, (err, body) => {
            const response = fn(body, this.req);
            this.handleResponse(response);
        });
    }
    async get(path, fn) {
        if (!path.exec(this.req.url)) {
            return;
        }
        const response = await fn({}, this.req);
        this.handleResponse(response);
    }
    handleResponse(response) {
        Promise.resolve(response).then(() => {
            this.res.setHeader('Content-Type', 'application/json');
            this.res.writeHead(response.code ? response.code : 200);
            this.res.end(JSON.stringify(response.body ? response.body : {}));
        });
    }
}
export default Routes;
