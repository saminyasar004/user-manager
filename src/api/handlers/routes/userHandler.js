/* eslint-disable no-underscore-dangle */
/**
 * Title: User Handler
 * Description: Handle user related stuff
 * Author: Samin Yasar
 * Date: 29/November/2021
 */

// Dependencies
const database = require("../../lib/database");
const utilities = require("../../helpers/utilities");

// Module scaffolding
const userHandler = {};

// Define the user CRUD operation object
userHandler._user = {};

// Define the handler function
userHandler.handler = (requestProps, callback) => {
    const acceptedMehtods = ["get", "post", "put", "delete"];
    if (acceptedMehtods.includes(requestProps.method)) {
        userHandler._user[requestProps.method](requestProps, callback);
    } else {
        callback(400, {
            error: "Your requested method is not allowed to continue.",
        });
    }
};

// Get method
userHandler._user.get = (requestProps, callback) => {
    const username = typeof requestProps.params[0] === "string" ? requestProps.params[0] : null;
    const password =
        typeof requestProps.reqBody.password === "string"
            ? utilities.encrypt(requestProps.reqBody.password)
            : null;
    if (username && password) {
        // store the placeholder value into an object
        const userObj = {
            username,
            password,
        };
        database.getUser(database.connection, userObj, (userError, userResult) => {
            if (!userError && userResult.length) {
                const userDetails = { ...userResult[0] };
                delete userDetails.password;
                callback(200, {
                    userDetails,
                });
            } else {
                callback(404, {
                    error: "Your requested user couldn't found.",
                });
            }
        });
    } else {
        callback(400, {
            error: "Please provide the username in URL path & the password in your request body.",
        });
    }
};

// Export module
module.exports = userHandler;
