"use strict";
const express = require('express');
const app = express();
const server = require('http').createServer(app);
app.use(express.static(__dirname + '/app'));
server.listen(8081, function () {
    console.log('server http launched');
});