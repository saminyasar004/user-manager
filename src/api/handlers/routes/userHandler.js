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
    const username =
        typeof requestProps.params[0] === "string" ? requestProps.params[0].trim() : null;
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

// Post method
userHandler._user.post = (requestProps, callback) => {
    const name =
        typeof requestProps.reqBody.name === "string" ? requestProps.reqBody.name.trim() : null;
    const username =
        typeof requestProps.reqBody.username === "string"
            ? requestProps.reqBody.username.trim()
            : null;
    const email =
        typeof requestProps.reqBody.email === "string" ? requestProps.reqBody.email.trim() : null;
    const password =
        typeof requestProps.reqBody.password === "string"
            ? utilities.encrypt(requestProps.reqBody.password)
            : null;
    if (name && username && email && password) {
        if (requestProps.params.length > 0) {
            callback(400, {
                error: "Your requested URL is incorrect.",
            });
        } else {
            // make sure that the username doesn't exist in the database.
            database.lookupUsername(
                database.connection,
                username,
                (usernameError, usernameResult) => {
                    if (!usernameError && usernameResult.length === 0) {
                        // make sure tha the email doesn't exist in the database.
                        database.lookupEmail(
                            database.connection,
                            email,
                            (emailError, emailResult) => {
                                if (!emailError && emailResult.length === 0) {
                                    // store all the placeholder values in an object
                                    const userObj = {
                                        name,
                                        username,
                                        email,
                                        password,
                                    };
                                    // insert the user to database.
                                    database.insertUser(
                                        database.connection,
                                        userObj,
                                        (insertError) => {
                                            if (!insertError) {
                                                callback(200, {
                                                    message:
                                                        "Successfully created a new user according to your details.",
                                                });
                                            } else {
                                                callback(500, {
                                                    error: insertError,
                                                });
                                            }
                                        }
                                    );
                                } else {
                                    callback(400, {
                                        error: "Your requested email is already taken. Please use another one.",
                                    });
                                }
                            }
                        );
                    } else {
                        callback(400, {
                            error: "Your requested username is already taken. Please use another one.",
                        });
                    }
                }
            );
        }
    } else {
        callback(400, {
            error: "Please provide name, username, email & password to create a new user.",
        });
    }
};

// Export module
module.exports = userHandler;
