# User Manager

RESTful API to manage user system.

[![MIT License](https://img.shields.io/npm/l/usermanager.svg)](https://github.com/saminyasar004/user-manager/blob/master/LICENSE)
[![Website](https://img.shields.io/website?label=saminyasar%20🚀&name=hello&style=flat&url=https://saminyasar.netlify.app/)](https://saminyasar.netlify.app/)
[![Github Follow](https://img.shields.io/github/followers/saminyasar004?label=saminyasar004&style=social)](https://github.com/saminyasar004/)

## Technology

-   Raw Node JS
-   MySQL Database

## API Methods

-   `GET`: Get a particular user data.
-   `POST`: Create a new user in the system.
-   `PUT`: Update an existing user data.
-   `DELETE`: Delete an existing user.

## API Routes

### `GET` Method:

-   `/user/:username`
-   Return a particular user's data.
-   Client should be provide the user's password in the request body.

### `POST` Method:

-   `/user`
-   Create a new user.
-   Client should be provide all the placeholder values (`name`, `username`, `email`, `password`) to create a new one. The `username` & the `email` would be unique.

### `PUT` Method:

-   `/user/:username`
-   Update an existing user. The require placeholder values should be passes as request body.
-   Placeholders: `name`, `username`, `email`, `password`, `newPassword`
-   The `password`: is the user's current password and the `newPassword`: is the user's new password to be changed. The `password` is required and others are optional.
-   All the placeholder values should be passes as request body
-   User can edit everything

### `DELETE` Method:

-   `/user/:username`
-   Delete an existing user data according to its username.
-   The user's password should be passes as request body
