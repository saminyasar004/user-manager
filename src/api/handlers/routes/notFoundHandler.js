/**
 * Title: Handle not found route
 * Description: Handle the route that is not exist in the server side
 * Author: Samin Yasar
 * Date: 29/November/2021
 */

// Module scaffolding
const notFoundHandler = {};

// Define the handler function
notFoundHandler.handler = (requestProps, callback) => {
    callback(404, {
        error: "Your requested route not found!",
    });
};

// Export module
module.exports = notFoundHandler;
