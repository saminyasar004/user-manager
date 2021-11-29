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
 * @param {Callback} callback - A callback function
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

// Export module
module.exports = database;
