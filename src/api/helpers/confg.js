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
        host: "sql6.freemysqlhosting.net",
        user: "sql6455903",
        password: "KkTxHabdT2",
        database: "sql6455903",
        port: 3306,
        tables: {
            user: "user_table",
        },
    },
};

// Export module
module.exports = confg;
