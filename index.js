require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
//require('./models/users.model')
const port = process.env.PORT || "3000";
const swaggerUI = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Solar System",
            version: "1.0.0",
            description: "Solar System test case APIs",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};
const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const routes = require('./routes/routes');
app.use('/', routes)
mongoose.Promise = global.Promise;
module.exports = app;
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});