
const express = require('express');

const noteRouter = require('./notes');

const app = express();

router.use('/notes', noteRouter);

module.exports = app;