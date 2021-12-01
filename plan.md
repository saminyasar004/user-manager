## Features

-   Application should be able to do CRUD operation to users
-   Requrie placeholder --> `name`, `username`, `email`, `password`. The `username` & `email` will be unique.
-   Accepted methods --> `GET`, `POST`, `PUT`, `DELETE`
-   `GET` method -->
    -   `/user/:username` --> Return a user details except user password according to its username.
    -   The user's password should be passed as request body.
-   `POST` method -->
    -   `/user` --> Create a new user. The require placeholder values should be passes as request body.
    -   `PUT` method -->
        -   `/user/:username` --> Update an existing user. The require placeholder values should be passes as request body.
        -   Placeholders --> `name`,`username`,`email`,`password`,`newPassword`
        -   The `password` -> is the user's current password and the `newPassword` -> is the user's new password to be changed. The `password` is required and others are optional.
        -   All the placeholder values should be passes as request body
        -   User can edit everything
    -   `DELETE` method -->
        -   `/user/:username` --> Delete an existing user data according to its username.

## Technology

-   Raw Node.js
-   MySQL database
