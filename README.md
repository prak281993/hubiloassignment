# API Description

## Hosting
##### The API is hosted at [https://hubiloapp.herokuapp.com](https://hubiloapp.herokuapp.com)


## Authorization API

* ### /signup

> Method : POST

> Body: 1. name, 2. email, 3. password, 4. confirmPassword, 5.device_token, 6. device_type

* ### /login
> Method: POST

> Body: 1. email, 2. password

> Response : Auth token

## Profile API

 * ### /getallusers
> Method : GET

> Params : None

> Restricted : Yes

> Provide token obtained after login in x-auth-token header of request

> Response : All users

* ### /getuser/:email
> Method : GET

> Params : email address of the user to be found

> Restricted : Yes

> Provide token obtained after login in x-auth-token header of request

> Response : If user exist it responds with the user else with error message


* ### /updateuser
> Method : POST

> Body: Provide user fields such as name, device_token and device_type to be updated. Email cannot be updated, since it is a unique identifier.

> Restricted : Yes

> Provide token obtained after login in x-auth-token header of request

> Response : Success message along with updated users details.


## Socket.io is also implemented. Whenever a user logs in , that user can be seen in the homepage of [https://hubiloapp.herokuapp.com/](https://hubiloapp.herokuapp.com/)
