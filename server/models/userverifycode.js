/**
 * Created by workbook on 17.04.2017.
 */
"use strict";

var ExpireVerifyCode = require('../../etc/configures').ExpireVerifyCode;

module.exports = function(sequelize, DataTypes) {
    var UserVerifyCode = sequelize.define("UserVerifyCode", {
        code: DataTypes.STRING,
        status: {type: DataTypes.STRING, defaultValue:'waitVerify'},
        dataEnd: DataTypes.DATE
    }, {
        classMethods: {
            associate: function(models) {
                // Can also simply do Task.belongsTo(models.User);
                UserVerifyCode.belongsTo(models.User, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        },

        setterMethods: {
            code: function (code) {
                var date = new Date(Date.now() + ExpireVerifyCode);
                this.setDataValue('code',code);
                this.setDataValue('dataEnd',date);
            }
        }
    });

    return UserVerifyCode;
};