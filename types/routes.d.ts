declare enum Methods {
    GET = "GET",
    POST = "POST"
}
declare type CallbackFunction = {
    (body: object, request: any): any;
};
declare type Response = {
    headers?: object;
    code?: number;
    body: any;
};
declare class Routes {
    requestListener: any;
    res: any;
    req: any;
    constructor(req: any, res: any);
    isMethod(method: keyof typeof Methods): boolean;
    route(method: keyof typeof Methods, path: RegExp, fn: CallbackFunction): void;
    post(path: RegExp, fn: CallbackFunction): void;
    get(path: RegExp, fn: CallbackFunction): Promise<void>;
    handleResponse(response: Response): void;
}
export default Routes;
//# sourceMappingURL=routes.d.ts.map