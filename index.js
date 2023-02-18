require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json')

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
app.use(cors())
app.use(express.json());

const routes = require('./routes/routes');
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
app.use('/', routes)
app.use(
    '/doc',
    swaggerUi.serve,
    swaggerUi.setup(swaggerFile)
);



