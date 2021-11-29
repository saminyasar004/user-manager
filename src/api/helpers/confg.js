/**
 * Title: Configuration setup
 * Description: Define global configuratin related stuff
 * Author: Samin Yasar
 * Date: 26/November/2021
 */

// Module scaffolding
const confg = {
    secretKey: "fsafrewruomipohkjhklkrewrqzxcm",
    db: {
        host: "localhost",
        username: "root",
        password: "",
        database: "user_manager",
        tables: {
            user: "user_table",
        },
    },
};

// Export module
module.exports = confg;
