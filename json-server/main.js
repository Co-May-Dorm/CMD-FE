const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const queryString = require("query-string")

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
    res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    console.log("res ", res)
    if (req.method === 'POST') {
        // req.body.createdAt = Date.now();
        // req.body.updateAt = Date.now();
    } else if (req.method === "PATCH") {
        req.body.updateAt = Date.now()
    }
    // Continue to JSON Server router
    next()
})

// In this example, returned resources will be wrapped in a body property
router.render = (req, res) => {
    /**
     * check if get and got pagination then return custom reponse
     * or return defual value
     */
    const header = res.getHeaders();
    const totalCountHeader = header["x-total-count"]
    const queryParams = queryString.parse(req._parsedUrl.query);
    // console.log(res)
    if (req.method === "GET" && totalCountHeader) {
        const result = {
            data: res.locals.data,
            pagination: {
                _page: Number.parseInt(queryParams._page),
                _limit: Number.parseInt(queryParams._limit),
                _totalItem: Number.parseInt(totalCountHeader),
            }
        }
        return res.jsonp(
            result
        )
    } else if (req.method === "GET" && !totalCountHeader) {

        const result = {
            data: res.locals.data,
            pagination: {
                _page: Number.parseInt(queryParams._page),
                _limit: Number.parseInt(queryParams._limit),
                _totalItem: Number.parseInt(totalCountHeader),
            }
        }
        return res.jsonp(
            result
        )
    }
    else if ((req.method === "POST") && res._hasBody) {

        return res.jsonp(res.locals.data)
    } else if (req.method === "PATCH" && res._hasBody) {
        return res.jsonp(res.locals.data)
    } else return res.jsonp(res.locals.data)
}

// Use default router
server.use(router)
server.listen(3030, () => {
    console.log('JSON Server is running')
})