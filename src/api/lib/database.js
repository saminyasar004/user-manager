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
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    port: config.db.port,
});

/**
 * Create table in the database
 *
 * @param {Connection} con - The database connection
 * @param {CallableFunction} callback - A callback function
 */
database.createTable = (con, callback) => {
    const sqlQuery = `CREATE TABLE IF NOT EXISTS ${config.db.tables.user} (id INT(11) AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)`;
    con.query(sqlQuery, (err) => {
        if (!err) {
            callback(null);
        } else {
            callback(err);
        }
    });
};

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
    const sqlQuery = `UPDATE ${config.db.tables.user} SET name = '${name}', username = '${username}', email = '${email}', password = '${password}' WHERE ${config.db.tables.user}.username = '${currentUsername}'`;
    con.query(sqlQuery, (err) => {
        if (!err) {
            callback(null);
        } else {
            callback("Error occures while updating the user's data.");
            throw new Error(err);
        }
    });
};

/**
 * Delete an existing user data.
 *
 * @param {Connection} con - Database connection
 * @param {Object} values - All the placeholder values in an object
 * @param {CallableFunction} callback - A callback function
 */
database.deleteUser = (con, values, callback) => {
    const { username, password } = values;
    const sqlQuery = `DELETE FROM ${config.db.tables.user} WHERE username = '${username}' AND password = '${password}'`;
    con.query(sqlQuery, (err, result) => {
        if (!err && result.affectedRows) {
            callback(null);
        } else {
            callback(err);
        }
    });
};

// Connect the database
database.connection.connect((connectionError) => {
    if (!connectionError) {
        console.log(`Successfully connected to ${config.db.database} database of MySQL.`);
        database.createTable(database.connection, (tableCreationError) => {
            if (!tableCreationError) {
                console.log(`Successfully created ${config.db.tables.user} table in the database.`);
            } else {
                console.log(
                    `Error occures while creating ${config.db.tables.user} table in the database.`
                );
            }
        });
    } else {
        console.log(`Error occures while connecting to the ${config.db.database} database.`);
        throw new Error(connectionError);
    }
});

// Export module
module.exports = database;
