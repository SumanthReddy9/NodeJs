const express = require("express");

const bodyParser = require("body-parser");

const dbConfig = require("./config/database.config")

const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

//mongoose.connect(dbConfig.url, {
//    useNewUrlParser: true
//}).then(() => {
//    console.log("Successfully connected to the database");
//}).catch(err => {
//    console.log('Counld not connected to database....', err);
//    process.exit();
//});
const routes  = require('./app/routes/note.routes.js');

app.get('/', (req, res) => {
    res.json({"Message": "Welcome to EasyNotes application. Take notes quickely"})
});

var swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


var swaggerDefinition = {
    info: {
        title: 'Node Swagger API',
        version: '1.0.1',
        description: 'Demonstrating how to describe a restful API with Swagger',
    }
};

var options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./app/routes/*.js'],
};
//console.log('api path: ' + options.apis);

var swaggerSpec = swaggerJSDoc(options);

//console.log(swaggerSpec);

app.get('/swagger.json', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use('/', routes);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
var port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server is listening on port 5000")
});