/**
 * Title: Request response handler
 * Description: Handler server request & response
 * Author: Samin Yasar
 * Date: 26/November/2021
 */

// Dependencies
const url = require("url");
const { StringDecoder } = require("string_decoder");

const routes = require("./routes");
const utilities = require("../helpers/utilities");

// Module scaffolding
const reqResHandler = {};

// Define the handler function
reqResHandler.handler = (req, res) => {
    const decoder = new StringDecoder("utf-8");
    let reqBody = "";
    const parsedURL = url.parse(req.url, true);
    parsedURL.pathname = parsedURL.pathname.replace(/^\/|\/$/gi, "");
    let basePathname;
    const params = [];
    if (parsedURL.pathname.split("/").length > 1) {
        [basePathname] = parsedURL.pathname.split("/");
        params.push(...parsedURL.pathname.split("/").slice(1));
    } else {
        basePathname = parsedURL.pathname;
    }
    const method = req.method.toLowerCase();
    const requestHeader = req.headers;
    const responseHeader = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Request-Method": "*",
        "Access-Control-Allow-Methods": "OPTIONS, GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
    };
    const queryObj = parsedURL.query;
    const requestProps = {
        basePathname,
        params,
        method,
        headerObj: requestHeader,
        queryObj,
    };
    const choosenHandler = routes[basePathname] ? routes[basePathname] : routes.notFound;

    req.on("data", (chunk) => {
        reqBody += decoder.write(chunk);
    });

    req.on("end", () => {
        reqBody += decoder.end();
        requestProps.reqBody = utilities.parseJSON(reqBody);

        choosenHandler(requestProps, (status, payload) => {
            const statusCode = typeof status === "number" ? status : 500;
            const payloadObj = typeof payload === "object" ? payload : {};
            const payloadStr = JSON.stringify(payloadObj);

            res.writeHead(statusCode, responseHeader);
            res.end(payloadStr);
        });
    });
};

// Export module
module.exports = reqResHandler;
