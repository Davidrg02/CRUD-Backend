const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const cors = require('cors');

const municipios = require('./modules/municipio/routes');
const errors = require('./network/errors');

const app = express();

// Cors
app.use(cors());

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure app
app.set('port', config.app.port);

// Routes
app.use('/api/municipios', municipios);

app.use(errors);



module.exports = app;
