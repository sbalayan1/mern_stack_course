What is middleware?

Middleware are functions, placed in the path of requests to our API. 
Adds functionality for the API
Essentially allows for preliminary request processing before getting to the controller

Middleware Types
- built-in: express.static, express.json
- custom: errorHandler, logger
- 3rd party middleware: cookie-parser, cors

date-fns and uuid are two separate packages that we use with our middleware