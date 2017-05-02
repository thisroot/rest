<<<<<<< HEAD
/**
 * Created by workbook on 17.04.2017.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Err = sequelize.define("Error", {
        code: DataTypes.INTEGER,
        errName: DataTypes.STRING,
        description: DataTypes.STRING
    });

    return Err;
=======
/**
 * Created by workbook on 17.04.2017.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Err = sequelize.define("Error", {
        code: DataTypes.INTEGER,
        errName: DataTypes.STRING,
        description: DataTypes.STRING
    });

    return Err;
>>>>>>> e442bcc69c8499ebe53f24ff5c42dfb5eff20109
};