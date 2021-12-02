/**
 * Title: Server setup
 * Description: Setup & configure server
 * Author: Samin Yasar
 * Date: 26/November/2021
 */

// Dependencies
const http = require("http");

const environment = require("./helpers/environment");
const { handler: reqResHandler } = require("./handlers/reqResHandler");

// Module scaffolding
const server = {};

// Define server initializer function
server.init = () => {
    // create a http server
    const httpServer = http.createServer(reqResHandler);

    // listen the server
    httpServer.listen(environment.port, () => {
        console.log(
            `Server is running at: ${environment.port} in ${environment.envName} environment.`
        );
    });
};

// Export module
module.exports = server;
