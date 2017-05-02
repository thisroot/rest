<<<<<<< HEAD
/**
 * Created by workbook on 17.04.2017.
 */
"use strict";
var ExpireUserToken = require('../../etc/configures').ExpireUserToken;

module.exports = function(sequelize, DataTypes) {
    var UserDevice = sequelize.define("UserDevice", {
        deviceSystem: DataTypes.STRING,
        deviceName: DataTypes.STRING,
        status: {type: DataTypes.STRING, defaultValue:'waitVerify'},
        token: DataTypes.STRING,
        dataEnd: DataTypes.DATE
    }, {
        classMethods: {
            associate: function (models) {
                // Using additional options like CASCADE etc for demonstration
                // Can also simply do Task.belongsTo(models.User);
                UserDevice.belongsTo(models.User, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        },
        setterMethods: {
            token: function (token) {
                var date = new Date(Date.now() + ExpireUserToken);
                this.setDataValue('token',token);
                this.setDataValue('dataEnd',date);
            }
        },

        hooks: {
            afterCreate: function (device) {

                this.count({
                    distinct: this.deviceSystem,
                    where:{
                        deviceSystem:device.dataValues.deviceSystem,
                        UserId:device.dataValues.UserId
                    }
                })
                    .then(function(count){

                        this.update({
                            deviceName:device.dataValues.deviceSystem + '-' + count
                        },{
                            where: {
                                Userid:device.dataValues.UserId
                            }});
                    })
            }
        }
    });

    return UserDevice;
=======
/**
 * Created by workbook on 17.04.2017.
 */
"use strict";
var ExpireUserToken = require('../../etc/configures').ExpireUserToken;

module.exports = function(sequelize, DataTypes) {
    var UserDevice = sequelize.define("UserDevice", {
        deviceSystem: DataTypes.STRING,
        deviceName: DataTypes.STRING,
        status: {type: DataTypes.STRING, defaultValue:'waitVerify'},
        token: DataTypes.STRING,
        dataEnd: DataTypes.DATE
    }, {
        classMethods: {
            associate: function (models) {
                // Using additional options like CASCADE etc for demonstration
                // Can also simply do Task.belongsTo(models.User);
                UserDevice.belongsTo(models.User, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        },
        setterMethods: {
            token: function (token) {
                var date = new Date(Date.now() + ExpireUserToken);
                this.setDataValue('token',token);
                this.setDataValue('dataEnd',date);
            }
        },

        hooks: {
            afterCreate: function (device) {

                this.count({
                    distinct: this.deviceSystem,
                    where:{
                        deviceSystem:device.dataValues.deviceSystem,
                        UserId:device.dataValues.UserId
                    }
                })
                    .then(function(count){

                        this.update({
                            deviceName:device.dataValues.deviceSystem + '-' + count
                        },{
                            where: {
                                Userid:device.dataValues.UserId
                            }});
                    })
            }
        }
    });

    return UserDevice;
>>>>>>> e442bcc69c8499ebe53f24ff5c42dfb5eff20109
};