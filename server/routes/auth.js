<<<<<<< HEAD
/**
 * Created by workbook on 14.04.2017.
 */
import models  from '../models';
import  passGenerator from 'password-generator';


//var passwords = require('../../etc/configures').passwords;
import {passwords} from '../../etc/configures'



let logger = require('../utils/logger')();

module.exports = {

    registerRoutes: function(rest){

        rest.post('/auth/register', this.register);
        rest.post('/auth/registercode', this.registerCode);
        rest.post('/auth/login', this.login);
        rest.post('/auth/changepassword', this.changePassword);

    },

    register: function (req, content, cb) {
        if(req.body.device && req.body.phone) {

            models.User.hasPhone(req.body.phone,function(res) {
                if(res)  {
                    cb(null,{
                        status:406,
                        message: "this phone is exist"
                    })
                } else {

                    var password = passGenerator(passwords.genPassLength,false);

                    models.User.create({
                        phone:req.body.phone,
                        password: password,
                        role: 'waitVerify'
                    }).then(function (user) {

                        // отправить код по СМС
                        var code = passGenerator(passwords.verifyCodeLength,false,/\d/);
                        var token = passGenerator(passwords.tokenLength,false);

                        var promises = [];

                        // создали токен для устройства
                        promises.push(models.UserDevice.create({
                            deviceSystem: req.body.device,
                            token: token,
                            UserId: user.dataValues.id}));

                        // создали код верификации
                        promises.push(models.UserVerifyCode.create({
                            code:code,
                            UserId:user.dataValues.id
                        }));

                        // отправили код пользователю
                        promises.push(true);

                        // при выполнении всех условий
                        Promise.all(promises).then(function() {

                            cb(null, {
                                token: token,
                                status: 201,
                                message: 'user created'
                            });

                        }).catch(function(err) {
                            logger.info('Error',err);

                            cb(null, {
                                status:500,
                                message: 'Internal Server Error'
                            })
                        });

                    });
                }
            })

        } else {
            cb(null, {
                status:400,
                message: 'incorrect request body',
                body: req.body
            })
        }

    },

    registerCode: function (req,content,cb) {
        if(req.body.code && req.body.token && req.body.device) {
            // ищем юзера по токену
            models.User.find({
                include:[{
                    model: models.UserDevice,
                    where: {
                        token: req.body.token
                    }},
                    models.UserVerifyCode
                ]})
                .then(function(user){
                    if(user) {
                        // проверим срок действия
                        models.UserVerifyCode.findOne({
                            where: {
                                UserId: user.dataValues.id,
                                dataEnd: {
                                    gt: new Date(Date.now())
                                },
                                status: 'waitVerify'
                            },
                            order: 'dataEnd DESC'
                        }).then(function (status) {
                            if (!status) {
                                cb(null, {
                                    status: 401,
                                    message: "verify time was expired or code was verified"
                                })
                            }
                            // проверим код
                            else if (user.UserVerifyCodes[0].dataValues.code != req.body.code) {
                                cb(null, {
                                    status: 401,
                                    message: "incorrect code"
                                })
                            } else {
                                // код подтвержден => указываем поле юзера о верификации, отправляем ответ
                                var promises = [];


                                // валидируем телефон юзеру
                                promises.push(
                                    models.User.update({
                                        isValidPhone: true,
                                        role: 'userBasic'
                                    }, {
                                        where: {
                                            id: user.id
                                        }
                                    })
                                );

                                // обновляем статус кода
                                promises.push(
                                    models.UserVerifyCode.update({
                                        status: 'verified'
                                    }, {
                                        where: {
                                            id: user.UserVerifyCodes[0].dataValues.id
                                        }
                                    })
                                );

                                // обновляем статус устройства
                                promises.push(
                                    models.UserDevice.update({
                                        status: 'verified'
                                    }, {
                                        where: {
                                            token: req.body.token
                                        }
                                    })
                                );

                                // при выполнении всех условий
                                Promise.all(promises).then(function () {

                                    cb(null, {
                                        status: 201,
                                        message: 'user phone was verified'
                                    });

                                }).catch(function (err) {
                                    logger.info('Error', err);

                                    cb(null, {
                                        status: 500,
                                        message: 'Internal Server Error'
                                    })
                                });
                            }

                        });

                    }
                    else {
                        cb(null, {
                            status:400,
                            message: 'incorrect request token',
                            body: req.body
                        })
                    }
                });

        } else {
            cb(null, {
                status:400,
                message: 'incorrect request body',
                body: req.body
            })
        }
    },

    login: function (req,content,cb) {
        cb(null,{})
    },

    changePassword: function (req,content,cb) {
        if(req.body.token &&  req.body.newpassword) {

            models.User.changePassword(req.body,function(res) {
                console.log(res);
                //cb(res)
            });



            // models.User.Update({
            //     password: req.body.newpassword,
            //     include:[{
            //         model: models.UserDevice,
            //         where: {
            //             token: req.body.token
            //         }},
            //         models.UserVerifyCode
            //     ]})


        } else {
            cb(null, {
                status:400,
                message: 'incorrect request body',
                body: req.body
            })
        }
    }
};


=======
/**
 * Created by workbook on 14.04.2017.
 */
import models  from '../models';
import  passGenerator from 'password-generator';


//var passwords = require('../../etc/configures').passwords;
import {passwords} from '../../etc/configures'



let logger = require('../utils/logger')();

module.exports = {

    registerRoutes: function(rest){

        rest.post('/auth/register', this.register);
        rest.post('/auth/registercode', this.registerCode);
        rest.post('/auth/login', this.login);
        rest.post('/auth/changepassword', this.changePassword);

    },

    register: function (req, content, cb) {
        if(req.body.device && req.body.phone) {

            models.User.hasPhone(req.body.phone,function(res) {
                if(res)  {
                    cb(null,{
                        status:406,
                        message: "this phone is exist"
                    })
                } else {

                    var password = passGenerator(passwords.genPassLength,false);

                    models.User.create({
                        phone:req.body.phone,
                        password: password,
                        role: 'waitVerify'
                    }).then(function (user) {

                        // отправить код по СМС
                        var code = passGenerator(passwords.verifyCodeLength,false,/\d/);
                        var token = passGenerator(passwords.tokenLength,false);

                        var promises = [];

                        // создали токен для устройства
                        promises.push(models.UserDevice.create({
                            deviceSystem: req.body.device,
                            token: token,
                            UserId: user.dataValues.id}));

                        // создали код верификации
                        promises.push(models.UserVerifyCode.create({
                            code:code,
                            UserId:user.dataValues.id
                        }));

                        // отправили код пользователю
                        promises.push(true);

                        // при выполнении всех условий
                        Promise.all(promises).then(function() {

                            cb(null, {
                                token: token,
                                status: 201,
                                message: 'user created'
                            });

                        }).catch(function(err) {
                            logger.info('Error',err);

                            cb(null, {
                                status:500,
                                message: 'Internal Server Error'
                            })
                        });

                    });
                }
            })

        } else {
            cb(null, {
                status:400,
                message: 'incorrect request body',
                body: req.body
            })
        }

    },

    registerCode: function (req,content,cb) {
        if(req.body.code && req.body.token && req.body.device) {
            // ищем юзера по токену
            models.User.find({
                include:[{
                    model: models.UserDevice,
                    where: {
                        token: req.body.token
                    }},
                    models.UserVerifyCode
                ]})
                .then(function(user){
                    if(user) {
                        // проверим срок действия
                        models.UserVerifyCode.findOne({
                            where: {
                                UserId: user.dataValues.id,
                                dataEnd: {
                                    gt: new Date(Date.now())
                                },
                                status: 'waitVerify'
                            },
                            order: 'dataEnd DESC'
                        }).then(function (status) {
                            if (!status) {
                                cb(null, {
                                    status: 401,
                                    message: "verify time was expired or code was verified"
                                })
                            }
                            // проверим код
                            else if (user.UserVerifyCodes[0].dataValues.code != req.body.code) {
                                cb(null, {
                                    status: 401,
                                    message: "incorrect code"
                                })
                            } else {
                                // код подтвержден => указываем поле юзера о верификации, отправляем ответ
                                var promises = [];


                                // валидируем телефон юзеру
                                promises.push(
                                    models.User.update({
                                        isValidPhone: true,
                                        role: 'userBasic'
                                    }, {
                                        where: {
                                            id: user.id
                                        }
                                    })
                                );

                                // обновляем статус кода
                                promises.push(
                                    models.UserVerifyCode.update({
                                        status: 'verified'
                                    }, {
                                        where: {
                                            id: user.UserVerifyCodes[0].dataValues.id
                                        }
                                    })
                                );

                                // обновляем статус устройства
                                promises.push(
                                    models.UserDevice.update({
                                        status: 'verified'
                                    }, {
                                        where: {
                                            token: req.body.token
                                        }
                                    })
                                );

                                // при выполнении всех условий
                                Promise.all(promises).then(function () {

                                    cb(null, {
                                        status: 201,
                                        message: 'user phone was verified'
                                    });

                                }).catch(function (err) {
                                    logger.info('Error', err);

                                    cb(null, {
                                        status: 500,
                                        message: 'Internal Server Error'
                                    })
                                });
                            }

                        });

                    }
                    else {
                        cb(null, {
                            status:400,
                            message: 'incorrect request token',
                            body: req.body
                        })
                    }
                });

        } else {
            cb(null, {
                status:400,
                message: 'incorrect request body',
                body: req.body
            })
        }
    },

    login: function (req,content,cb) {
        cb(null,{})
    },

    changePassword: function (req,content,cb) {
        if(req.body.token &&  req.body.newpassword) {

            models.User.changePassword(req.body,function(res) {
                console.log(res);
                //cb(res)
            });



            // models.User.Update({
            //     password: req.body.newpassword,
            //     include:[{
            //         model: models.UserDevice,
            //         where: {
            //             token: req.body.token
            //         }},
            //         models.UserVerifyCode
            //     ]})


        } else {
            cb(null, {
                status:400,
                message: 'incorrect request body',
                body: req.body
            })
        }
    }
};


>>>>>>> e442bcc69c8499ebe53f24ff5c42dfb5eff20109
