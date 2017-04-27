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
};