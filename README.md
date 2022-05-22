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