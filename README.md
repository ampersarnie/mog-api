# MogAPI

Great googly Moogly, a small API.

_This is a personal tool, it's probably no good for you. It was built for me to easily spin up and test API endpoints and prototype features on the fly._

## Usage

```ts
const API = new MogAPI(host, port);

API.serve((Routes) => {
  Routes.route("GET", /users/, getUsers);
  Routes.route("POST", /users\/([0-9])\/update/, updateUsers);
});
```

## MogAPI API

### `MogAPI(host, port)` _class_

Base class that lets you start the server for the environment.

**Parameters**

- `host` _string_ (default: _`localhost`_) - Set the host for the server to start on.
- `port` _number_ (default: _`8080`_) - Set the port for the server to use.

#### `MogAPI.serve(requestListener)` _method_

Creates the server, listens on the assigned `port` and serves any content passed through the `requestListener` callback.

**Parameters**

- `requestListener` _RequestListener_ - The call back that is used for serving up content. An instance of `Routes` is passed as the only accepted argument.

---

### `Routes(req, res)` _class_

Creates a routing instance to manage the API routes.

**Parameters**

- `req` _any_ - A request object.
- `res` _any_ - A response object of the current request.

#### `Routes.route(method, path, fn)` _method_

Long form assignment of a route against the current request.

**Parameters**

- `method` _Method_ - The request method type.
- `path` _RegExp_ - Regular expression pattern to match against the request url.
- `fs` _CallbackFunction_ - The function to call when the method and path are valid.

#### `Routes.get(path, fn)` _method_

Short for `Routes.route('GET', /test/, () => {});`

**Parameters**

- `path` _RegExp_ - Regular expression pattern to match against the request url.
- `fs` _CallbackFunction_ - The function to call when the method and path are valid.

#### `Routes.post(path, fn)` _method_

Short for `Routes.route('POST', /test/, () => {});`

**Parameters**

- `path` _RegExp_ - Regular expression pattern to match against the request url.
- `fs` _CallbackFunction_ - The function to call when the method and path are valid.

#### `Routes.handleResponse(response)` _method_

Handles the response content from a `CallbackFunction`

**Parameters**

- `response` _Response_ - Regular expression pattern to match against the request url.

---

## To Do

- Allow for any captured results and pattern matches to be passed back to the `CallbackFunction`.
