/**
 * Title: Environment setup
 * Description: Configure environment related stuff
 * Author: Samin Yasar
 * Date: 26/November/2021
 */

// Module scaffolding
const environment = {};

// Development environment
environment.development = {
    envName: "Development",
    port: "3000",
};

// Development environment
environment.production = {
    envName: "Production",
    port: "8080",
};

// Validate the corresponding environment object
const environmentToExport =
    typeof process.env.NODE_ENV === "string" && environment[process.env.NODE_ENV]
        ? environment[process.env.NODE_ENV]
        : environment.development;

// Export module
module.exports = environmentToExport;
