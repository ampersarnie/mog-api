import Routes from './routes.js';
declare type RequestListener = {
    (Router: Routes): void;
};
declare class API {
    host: string;
    port: number;
    constructor(host: string, port: number);
    serve(requestListener: RequestListener): this;
}
export default API;
//# sourceMappingURL=api.d.ts.map