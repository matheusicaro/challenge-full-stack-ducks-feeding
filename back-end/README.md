## BUILDING THE POWERBALL LOTTERY - REST API FOR THE BACK-END CHALLENGE FROM CODILITY. 

[![license](https://img.shields.io/github/license/DAVFoundation/captain-n3m0.svg?style=flat-square)](https://github.com/matheusicaro/coderbyte-full-stack-project/blob/master/LICENSE)


## Summary:

1. [Intro](#intro)
2. [Project Screen Shot](#project-screen-shot)
3. [Installation and Setup Instructions](#installation-and-setup-instructions))
4. [Folder Structure](#folder-structure)
5. [Project Specifications](#project-specifications)
6. [To Do List](#to-do-list)


## Intro:

API Rest developed for Full Stack developer challenge. 
More details of the challenge can be accessed at [this link](https://github.com/matheusicaro/challenge-full-stack-ducks-feeding#challenge).

---

## Project Screen Shot

... pending


## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

1. clone the repository: `git clone https://github.com/matheusicaro/challenge-full-stack-ducks-feeding`
2. Access the backend folder by the terminal: `cd back-end`
3. Installation: `npm install`
4. Configure the application's environment variables. Just use this available file as an example:
       4.1 rename the file from '.env-example' to '.env'
       4.2 change the example values available in the [file itself](https://github.com/matheusicaro/challenge-full-stack-ducks-feeding/blob/master/back-end/.env-cloud)
5. To Start Server: `npm start`  
6. To Check Health Api: `localhost:4001/api/v1/health`
7. To Documentation Api: `localhost:4000/api-docs`  

## Folder Structure

```
-- src/config ___________________________: layer for configurations of essential services such as logger, environment, etc.
-- src/routes ___________________________: API routes
-- src/api ______________________________: API business layer
-- src/api/constants ____________________: layer for general constants such as messages, warnings, etc.r
-- src/api/controllers __________________: layer for controllers for handling requests
-- src/api/exceptions ___________________: layer for custom exceptions for API
-- src/api/integration __________________: layer for integration of external services such as the Database
-- src/api/integration/dto ______________: data object that represents relationship of tables generating new data
-- src/api/integration/table ____________: object representative of database tables
-- src/api/integration/middlewares ______: request midlewares as the access validator for private routes
-- src/api/models _______________________: layer for structured objects for runtime use
-- src/api/services _____________________: layer for business rules that responds to requests.
-- src/tests ____________________________: application unit tests
```  

## Project Specifications

- Used [Node.js](https://nodejs.org/en/) with [express](https://expressjs.com/)
- Used [Jest](https://jestjs.io/) for unit testing
- Used [Winston](https://typicode.github.io/husky/#/) for the storage of the logs.
- Used [Axios](https://axios-http.com/) for promises based HTTP client

## To Do List:  

Due to the availability of time to implement the solution for the proposed challenge that was 12 hours, some tasks that are not mandatory for the challenge, but essential to deliver the solution, are pending below as a suggestion for better futures:

1. End Schedule Feeds Feature
2. Increase unit test and integration coverage
<br> [src/tests/controller/animal-feeding.controller.test.ts](https://github.com/matheusicaro/challenge-full-stack-ducks-feeding/blob/master/back-end/src/tests/controller/animal-feeding.controller.test.ts)
<br> [src/tests/services/animal-feeding.service.test.ts](https://github.com/matheusicaro/challenge-full-stack-ducks-feeding/blob/master/back-end/src/tests/services/animal-feeding.service.test.ts)
<br> [src/tests/integration/database.integration.test.ts](https://github.com/matheusicaro/challenge-full-stack-ducks-feeding/blob/master/back-end/src/tests/integration/database.integration.test.ts)
<br> [src/tests/config/logger.test.ts](https://github.com/matheusicaro/challenge-full-stack-ducks-feeding/blob/master/back-end/src/tests/config/logger.test.ts)
<br> [src/tests/config/environment.test.ts](https://github.com/matheusicaro/challenge-full-stack-ducks-feeding/blob/master/back-end/src/tests/config/environment.test.ts)
<br> [src/tests/controller/health.controller.test.ts](https://github.com/matheusicaro/challenge-full-stack-ducks-feeding/blob/master/back-end/src/tests/controller/health.controller.test.ts)