/**
 * Title: Utility Functions
 * Description: Define some useful utility functions for this project
 * Author: Samin Yasar
 * Date: 29/November/2021
 */

// Dependencies
const crypto = require("crypto");
const config = require("./confg");

// Module scaffolding
const utilities = {};

/**
 * parseJSON - parse a JSON string into a valid javascript object
 * @param {String} str - The string to be parsed as JavaScript object
 * @returns {Object} - A valid JavaScript object
 */
utilities.parseJSON = (str) => {
    let obj;
    try {
        obj = JSON.parse(str);
    } catch (err) {
        obj = {};
    }
    return obj;
};

/**
 * Encrypt a string
 *
 * @param {String} str - The exact string to be encrypted
 * @returns {String} - The encrypted result of the passes string
 */
utilities.encrypt = (str) => {
    if (typeof str === "string" && str.trim().length > 0) {
        return crypto.createHmac("sha256", config.secretKey).update(str).digest("hex");
    }
    return null;
};

// Export module
module.exports = utilities;
