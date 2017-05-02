<<<<<<< HEAD
/**
 * Created by workbook on 12.04.2017.
 */
import express from 'express';
import connect from 'connect';
import http     from 'http';
import path     from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import models from './models';
import configures from '../etc/configures.js';


let app = connect()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended:true}))
    .use(cookieParser())
    .use(express.static(path.join(__dirname, 'client')))


//app.set('port', process.env.PORT || configures.serverPort);

let logger = require('./utils/logger')();
app.use(morgan("combined", { stream: logger.stream }));

// Using domains for better error handling
require('./utils/domain')(app);


// REST SERVICE
require('./utils/rest')(app);


// 404 catch-all handler (middleware)
app.use((req, res) => {
    logger.info('404');
    //res.statusCode = 404;
    return res.end('rewss');
});

// 500 error handler (middleware)
app.use((err, req, res) => {
    console.error(err.stack);
    logger.info('500');
    //res.statusCode = 500;
    return res.end('500');
});

let server;

function startServer() {
    server = http.createServer(app).listen(configures.serverPort, () => {
        console.log( 'Express started in ' + configures.serverPort +
            ' mode on http://localhost:' + configures.serverPort +
            '; press Ctrl-C to terminate.' );
    });
}

if (require.main === module) {
    // application run directly; start app server
    startServer();
} else {
    // application imported as a module via "require": export function to create server
    module.exports = startServer;
}
=======
/**
 * Created by workbook on 12.04.2017.
 */
import express from 'express';
import connect from 'connect';
import http     from 'http';
import path     from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import models from './models';
import configures from '../etc/configures.js';


let app = connect()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended:true}))
    .use(cookieParser())
    .use(express.static(path.join(__dirname, 'client')))


//app.set('port', process.env.PORT || configures.serverPort);

let logger = require('./utils/logger')();
app.use(morgan("combined", { stream: logger.stream }));

// Using domains for better error handling
require('./utils/domain')(app);


// REST SERVICE
require('./utils/rest')(app);


// 404 catch-all handler (middleware)
app.use((req, res) => {
    logger.info('404');
    //res.statusCode = 404;
    return res.end('rewss');
});

// 500 error handler (middleware)
app.use((err, req, res) => {
    console.error(err.stack);
    logger.info('500');
    //res.statusCode = 500;
    return res.end('500');
});

let server;

function startServer() {
    server = http.createServer(app).listen(configures.serverPort, () => {
        console.log( 'Express started in ' + configures.serverPort +
            ' mode on http://localhost:' + configures.serverPort +
            '; press Ctrl-C to terminate.' );
    });
}

if (require.main === module) {
    // application run directly; start app server
    startServer();
} else {
    // application imported as a module via "require": export function to create server
    module.exports = startServer;
}
>>>>>>> e442bcc69c8499ebe53f24ff5c42dfb5eff20109
