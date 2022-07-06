const swaggerAutogen = require('swagger-autogen')();

const doc = {
    "swagger": "2.0",
    "info": {
      "version": "1.0.0",
      "title": "CRUD OPERATIONS",
      "description": "Parking Manager Mobile Version"
    },
    "basePath": "/api",
    "tags": [
      {
        "name": "Users",
        "description": "API for users in the system"
      }
    ],
    "schemes": ["http"],
    "consumes": ["application/json"],
    "produces": ["application/json"]
}

const outputFile = './swagger-output.json'
const endpoints = ['src/requests/addPayment', 'src/requests/userChecker']

swaggerAutogen(outputFile, endpoints, doc)