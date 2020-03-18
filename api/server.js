const express = require('express'); //import express
const helmet = require('helmet'); //import helmet

const carsRouter = require('../router/car-router'); //import carsRouter

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/cars', carsRouter);

module.exports = server;