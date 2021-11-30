## Features

-   Application should be able to do CRUD operation to users
-   Requrie placeholder --> `name`, `username`, `email`, `password`. The `username` & `email` will be unique.
-   Accepted methods --> `GET`, `POST`, `PUT`, `DELETE`
-   `GET` method -->
    -   `/user/:username` --> Return a user details except user password according to its username & the user password will be passed as request body.
-   `POST` method -->
    -   `/user` --> Create a new user. The require placeholder values should be passes as request body.
    -   `PUT` method -->
        -   `/user` --> Update an existing user. The require placeholder values should be passes as request body.
    -   `DELETE` method -->
        -   `/user/:username` --> Delete an existing user data according to its username.

## Technology

-   Raw Node.js
-   MySQL database
