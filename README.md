# The Mower Backend 

The mower backend is a backend application which is a communication link between the mower and the mobile application for reading and writing data.
![System architecture ](/documentation/systemArchitecture.png)
## Tech

The backend uses a number of open source projects to work properly:

- [Node.js] - Evented I/O for the backend
- [Express] - Fast node.js network app framework 
- [Awilix] - Extremely powerful Dependency Injection (DI) container for JavaScript/Node
- [Sequelize] - Sequelize is a promise-based Node.js ORM tool for Postgres, MySQL, MariaDB, SQLite, DB2 and Microsoft SQL Server.
- [pg] - Non-blocking PostgreSQL client for Node.js.
- [nodemon] - nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
- [jsonwebtoken] - is an access token standard that apps use to sign data transferred over the internet. It can also encrypt JSON payloads, and tokens may be signed with a private or public/private secret key. Through the jsonwebtoken module, this module offers Express middleware for verifying JSON Web Tokens
- [aws-sdk] - A SDK for AWS
- [cognito-express] - Amazon Cognito allows the backend to add functions for adding user, user sign up, sign in and to control access in the app.
- [multer] - multer is a middleware that handles uploading files in the application, multipart/form-data.
- [multer-s3] - Streaming multer storage engine for AWS S3.
- [google-cloud/vision] - Google Cloud Vision API client for Node.js
- [express-jwt] - This module provides Express middleware for validating JWTs (JSON Web Tokens) through the jsonwebtoken module.
- [dotenv] - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
- [express-jwt-authz] - Validate a JWTs scope to authorize access to an endpoint.
- [fs] - This module make file opertaion apis simple, you don't need to care the dir exits. and the api is same as node's filesystem.
- [jwk-to-pem] - Convert a json web key to a PEM for use by OpenSSL or crytpo.
- [jwks-rsa] - A library to retrieve signing keys from a JWKS (JSON Web Key Set) endpoint.
- [node-fetch] - A light-weight module that brings [Fetch API] to Node.js.path
- [xmlhttprequest] - node-XMLHttpRequest is a wrapper for the built-in http client to emulate the browser XMLHttpRequest object.
## To start the app
Navigate to /backend folder and run following command:
```
docker-compose up --build
```
The app is now running on localhost:8080

## To close the app
"ctrl + c" to stop the process in the terminal.
To stop the containers run:
```
docker-compose down
```

## To install npm pacakges
Step into: "/backend/backend-app" and run following command:
```
npm install <package name>
```
## The API layer 
- Endpoint documentation can be found here: [Swagger]
- Documentation for authentication endpoints can be found here: [Swagger-authentication]
## The logic layer
### Validation error codes
|           Code             |                                Reason                               |   
| -------------------------  | ------------------------------------------------------------------- |
| `invalidDataType`          | Thrown when a invalid data type is sent to the backend, e.g. the backend expects a Int but got a string| 
| `notAnArray`               | Thrown when the backend expects an array as an input, e.g. [ ]    | 
| `invalidDataTypeInArray`   | Thrown when the data type in the array is not a number |
| `invalidStatus`     | Thrown when the status is not "start bt" or "start auto" or "stop"  |
### Database error codes
|           Code             |                                Reason                               |   
| -------------------------  | ------------------------------------------------------------------- |
| `dbUniqueConstraintError`  | Thrown when a unique constraint is violated in the database         | 
| `dbForeignKeyConstraintError`| Thrown when a foreign key constraint is violated in the database  | 
| `dbError`                  | Thrown when an internal error occurs in the database or when something unexpected happens, contact the admin|
## The data layer

![Data structure](/documentation/dataStructure.png)
 



## License


   [Awilix]: <https://www.npmjs.com/package/awilix>
   [Swagger]:<https://app.swaggerhub.com/apis-docs/Backend-group7/Mobile/1.0.0>
   [Swagger-authentication]:<https://app.swaggerhub.com/apis-docs/Backend-group7/Authentication/1.0.0>
   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Express]: <http://expressjs.com/>
   [jQuery]: <http://jquery.com>
   [Sequelize]:<https://www.npmjs.com/package/sequelize>
   [Nodemon]:<https://www.npmjs.com/package/nodemon>
   [pg]:<https://www.npmjs.com/package/pg>
  [jsonwebtoken]: <https://www.npmjs.com/package/jsonwebtoken>
  [aws-sdk]:<https://www.npmjs.com/package/aws-sdk> 
  [cognito-express]:<https://www.npmjs.com/package/cognito-express> 
  [multer]:https://www.npmjs.com/package/multer> 
  [multer-s3]:<https://www.npmjs.com/package/multer-s3> 
  [google-cloud/vision]:<https://www.npmjs.com/package/@google-cloud/vision> 
  [express-jwt]:<https://www.npmjs.com/package/express-jwt> 
  [dotenv]:<https://www.npmjs.com/package/dotenv>
  [express-jwt-authz]:<https://www.npmjs.com/package/express-jwt-authz>
  [fs]:<https://www.npmjs.com/package/file-system> 
  [jwk-to-pem]:<https://www.npmjs.com/package/jwk-to-pem>
  [jwks-rsa]:<https://www.npmjs.com/package/jwks-rsa> 
  [node-fetch]:<https://www.npmjs.com/package/node-fetch>
  [xmlhttprequest]:<https://www.npmjs.com/package/xmlhttprequest> 
  [Fetch API]:<https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API>