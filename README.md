# User Manager

RESTful API to manage user system.

## Technology

-   Raw Node JS
-   MySQL Database

## API Methods

-   `GET` --> Get a particular user data.
-   `POST` --> Create a new user in the system.
-   `PUT` --> Update an existing user data.
-   `DELETE` --> Delete an existing user.

## API Routes

-   `/user/:username`
    -   Return a particular user data.
    -   Client should be provide the user's password in the request body.
-   `/user`
    -   Create a new user.
    -   Client should be provide all the placeholder values (`name`, `username`, `email`,`password`) to create a new one. The `username` & the `email` would be unique.
-   `/user/:`
