<<<<<<< HEAD
/**
 * Created by workbook on 18.04.2017.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Logs = sequelize.define("Logs", {
        level: DataTypes.INTEGER,
        message: DataTypes.STRING,
        meta: DataTypes.STRING,
        timestamp: DataTypes.DATE
    });

    return Logs;
};
=======
/**
 * Created by workbook on 18.04.2017.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Logs = sequelize.define("Logs", {
        level: DataTypes.INTEGER,
        message: DataTypes.STRING,
        meta: DataTypes.STRING,
        timestamp: DataTypes.DATE
    });

    return Logs;
};
>>>>>>> e442bcc69c8499ebe53f24ff5c42dfb5eff20109
