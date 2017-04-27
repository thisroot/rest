/**
 * Created by workbook on 13.04.2017.
 */
"use strict";

var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        role: {type: DataTypes.STRING, defaultValue:'default'},
        firstName: DataTypes.STRING,
        secondName: DataTypes.STRING,
        middleName: DataTypes.STRING,
        birthDate:DataTypes.DATE,
        phone: DataTypes.STRING,
        isValidPhone : {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            set: function(value) {
                if (value === 'true') value = true;
                if (value === 'false') value = false;
                this.setDataValue('isValidPhone', value);
            }},
        hash: DataTypes.STRING,
        salt: DataTypes.STRING
    }, {

        classMethods: {
            associate: function(models) {
                User.hasMany(models.UserDevice);
                User.hasMany(models.UserVerifyCode);
            },
            hasPhone: function (phone,cb) {
                this.findOne({where: {phone: phone}}).then(function(item) {
                   if(item)  return  cb(true);
                   return   cb(false);
                });
            },

            changePassword: function (options,cb) {
                // ищем юзера по токену

                this.findOne({
                    include:[{
                        model: models.UserDevice,
                        where: {
                            token: options.token
                        }}
                    ]}).then(function(user){
                        if(user) {

                            // console.log(user);
                            //
                            // if(user.instanceMethods.checkPassword(options.newpassword)){
                            //     cb({status:false,message:'this is old password'});
                            //
                            // } else {

                                this.update({
                                    password: options.newpassword
                                }, {
                                    where: {
                                        id: user.id
                                    }
                                }).then(function (user) {
                                    cb({status: true, message: 'password changed'});
                                });
                          //  }

                        } else {
                            cb({status:false,message:'device wont find'});
                        }
                })
            }
        },

        instanceMethods: {
            checkPassword: function (password) {
                return this.encryptPassword(password,this.salt) === this.hash;
          }
        },

        setterMethods: {
            password: function (password) {

               function  encryptPassword(password,salt){
                    return crypto.createHmac('sha1', salt).update(password).digest('hex');
                }

                this.setDataValue('salt',crypto.randomBytes(32).toString('hex'));
                this.setDataValue('hash',encryptPassword(password,this.salt))
            }
        },
        getterMethods: {
            password: function() {
                return this.hash;
            }
        }

    });

    return User;
};