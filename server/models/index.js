<<<<<<< HEAD
/**
 * Created by workbook on 13.04.2017.
 */
"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require('../../etc/configures');
var logger    = require('../utils/logger')();


var seqConf = {
    username: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    host: config.mysql.host,
    dialect: "mysql",
    logging:logger.info
};

if (process.env.DATABASE_URL) {
    var sequelize = new Sequelize(process.env.DATABASE_URL,seqConf);
} else {
    var sequelize = new Sequelize(seqConf.database, seqConf.username, seqConf.password, seqConf);
}
var db        = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {

        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

=======
/**
 * Created by workbook on 13.04.2017.
 */
"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require('../../etc/configures');
var logger    = require('../utils/logger')();


var seqConf = {
    username: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    host: config.mysql.host,
    dialect: "mysql",
    logging:logger.info
};

if (process.env.DATABASE_URL) {
    var sequelize = new Sequelize(process.env.DATABASE_URL,seqConf);
} else {
    var sequelize = new Sequelize(seqConf.database, seqConf.username, seqConf.password, seqConf);
}
var db        = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {

        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

>>>>>>> e442bcc69c8499ebe53f24ff5c42dfb5eff20109
module.exports = db;