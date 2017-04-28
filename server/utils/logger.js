/**
 * Created by workbook on 13.04.2017.
 */
import configures  from '../../etc/configures';
import winston  from 'winston';
import winstonMysql from 'winston-mysql';

module.exports  = function() {

    let loggerConf = {
        winstonMysql: {
            host: configures.mysql.host,
            user: configures.mysql.user,
            password: configures.mysql.password,
            database: configures.mysql.database,
            table: 'Logs'
        },
        winstonConsole: {
            level:'debug',
            handleExceptions: true,
            prettyPrint: true,
            silent:false,
            timestamp: true,
            colorize: true,
            json: false
        }
    };

    let logger = new (winston.Logger)({
        ExitOnError: true, //don't crash on exception
        transports: [
            new (winstonMysql)(loggerConf.winstonMysql),
            new (winston.transports.Console)(loggerConf.winstonConsole)
        ]
    });

    logger.stream = {
        write: function(message, encoding){
            logger.info(message);
        }
    };

    return logger;
};