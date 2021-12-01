/**
 * Title: Database Configure
 * Description: Configure database related operation
 * Author: Samin Yasar
 * Date: 29/November/2021
 */

// Dependencies
const mysql = require("mysql");

const config = require("../helpers/confg");

// Module scaffolding
const database = {};

database.connection = mysql.createConnection({
    host: config.db.database.host,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
});

database.connection.connect((err) => {
    if (!err) {
        console.log(`Successfully connected to ${config.db.database} database of MySQL.`);
    } else {
        console.log(`Error occures while connecting to the ${config.db.database} database.`);
        throw new Error(err);
    }
});

/**
 * Get user details by username & password
 *
 * @param {Connection} con - The database connection property
 * @param {Object} values - The username & the password of the user as an object
 * @param {CallableFunction} callback - A callback function
 * @returns {Array} - An array of the user's details
 */
database.getUser = (con, values, callback) => {
    const { username, password } = values;
    const sqlQuery = `SELECT * FROM ${config.db.tables.user} WHERE username= '${username}' AND password = '${password}'`;
    con.query(sqlQuery, (err, result) => {
        if (!err && result) {
            callback(null, result);
        } else {
            callback("Error occures to selecting your user data.", null);
            throw new Error(err);
        }
    });
};

/**
 * Lookup a user details according to its username
 *
 * @param {Connection} con - Database connection property
 * @param {String} username - The username of the user
 * @param {CallableFunction} callback - A callback function
 * @returns {Array} - An array of the user's details
 */
database.lookupUsername = (con, username, callback) => {
    const sqlQuery = `SELECT * FROM ${config.db.tables.user} WHERE username = '${username}'`;
    con.query(sqlQuery, (err, result) => {
        if (!err && result) {
            callback(null, result);
        } else {
            callback("Error occures to selecting your user data.", null);
            throw new Error(err);
        }
    });
};

/**
 * Lookup a user details according to its email
 *
 * @param {Connection} con - Database connection property
 * @param {String} email - The email of the user
 * @param {CallableFunction} callback - A callback function
 * @returns {Array} - An array of the user's details
 */
database.lookupEmail = (con, email, callback) => {
    const sqlQuery = `SELECT * FROM ${config.db.tables.user} WHERE email = '${email}'`;
    con.query(sqlQuery, (err, result) => {
        if (!err && result) {
            callback(null, result);
        } else {
            callback("Error occures to selecting your user data.", null);
            throw new Error(err);
        }
    });
};

/**
 * Insert a user into database.
 *
 * @param {Connection} con - Database connection
 * @param {Object} values - All the placeholder values in an object
 * @param {CallableFunction} callback - A callback function
 */
database.insertUser = (con, values, callback) => {
    const { name, username, email, password } = values;
    const sqlQuery = `INSERT INTO ${config.db.tables.user} (name, username, email, password) VALUES ('${name}', '${username}', '${email}', '${password}')`;
    con.query(sqlQuery, (err) => {
        if (!err) {
            callback(null);
        } else {
            callback("Error occures while insert a new user.");
            throw new Error(err);
        }
    });
};

/**
 * Update an existing user data.
 *
 * @param {Connection} con - Database connection
 * @param {Object} values - All the placeholder values in an object
 * @param {CallableFunction} callback - A callback function
 */
database.updateUser = (con, values, callback) => {
    const { name, currentUsername, username, email, password } = values;

    // const placeholderQuery = `${name ? `name = '${name}'\n` : ""}${
    //     username ? `username = '${username}'\n` : ""
    // }${email ? `email = '${email}'\n` : ""}${newPassword ? `password = '${newPassword}'\n` : ""}`;

    // if (placeholderQuery) {
    // const sqlQuery = `UPDATE ${config.db.tables.user} SET ${placeholderQuery
    //     .split("\n")
    //     .filter((el) => Boolean(el.trim()))
    //     .join(", ")} WHERE ${config.db.tables.user}.username = '${currentUsername}'`;

    const sqlQuery = `UPDATE ${config.db.tables.user} SET name = '${name}', username = '${username}', email = '${email}', password = '${password}' WHERE ${config.db.tables.user}.username = '${currentUsername}'`;

    con.query(sqlQuery, (err) => {
        if (!err) {
            callback(null);
        } else {
            callback("Error occures while updating the user's data.");
            throw new Error(err);
        }
    });
    // }
};

// Export module
module.exports = database;
