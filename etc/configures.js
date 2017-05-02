<<<<<<< HEAD
/**
 * Created by workbook on 12.04.2017.
 */
module.exports =  {
    apiPrefix: 'api',
    serverPort: 8181,
    mysql: {
        host: 'localhost',
        user: 'video',
        password: 'R3d9juCZA2Z',
        database: 'video'
    },
    redis: {
        port: 6379
    },
    QB: {
        urlAPI: 'https://api.quickblox.com',
        vAPI: '0.1.0',
        application_id: '4'
    },
    urlAPI: 'https://api.video.artinvest52.ru',
    urlHOST: 'https://video.artinvest52.ru',
    passwords: {
        tokenLength: 11,
        verifyCodeLength: 4,
        genPassLength: 11
    },
    ExpireVerifyCode: 60 * 60 * 1000, // 1 Hour
    ExpireUserToken: 365 * 24 * 60 * 60 * 1000 // 1 Year

=======
/**
 * Created by workbook on 12.04.2017.
 */
module.exports =  {
    apiPrefix: 'api',
    serverPort: 8181,
    mysql: {
        host: 'localhost',
        user: 'video',
        password: 'R3d9juCZA2Z',
        database: 'video'
    },
    redis: {
        port: 6379
    },
    QB: {
        urlAPI: 'https://api.quickblox.com',
        vAPI: '0.1.0',
        application_id: '4'
    },
    urlAPI: 'https://api.video.artinvest52.ru',
    urlHOST: 'https://video.artinvest52.ru',
    passwords: {
        tokenLength: 11,
        verifyCodeLength: 4,
        genPassLength: 11
    },
    ExpireVerifyCode: 60 * 60 * 1000, // 1 Hour
    ExpireUserToken: 365 * 24 * 60 * 60 * 1000 // 1 Year

>>>>>>> e442bcc69c8499ebe53f24ff5c42dfb5eff20109
};