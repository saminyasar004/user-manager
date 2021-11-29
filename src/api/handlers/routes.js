/**
 * Title: Routing setup
 * Description: Configure routing for this project
 * Author: Samin Yasar
 * Date: 29/November/2021
 */

// Dependencies
const { handler: userHandler } = require("./routes/userHandler");
const { handler: notFoundHandler } = require("./routes/notFoundHandler");

// Module scaffolding
const routes = {
    user: userHandler,
    notFound: notFoundHandler,
};

// Export module
module.exports = routes;
