/**
 * Created by workbook on 14.04.2017.
 */

module.exports = function(app,logger){

    const apiOptions = {
        context: '',
        domain: require('domain').create()
    };

    apiOptions.domain.on('error', function(err){
        console.log('API domain error.\n', err.stack);
        setTimeout(function(){
            console.log('Server shutting down after API domain error.');
            process.exit(1);
        }, 5000);
        server.close();
        let worker = require('cluster').worker;
        if(worker) worker.disconnect();
    });

    const rest = require('connect-rest').create(apiOptions);

    app.use(rest.processRequest());

    // Using auth routes
    require('../routes/sessions').registerRoutes(rest);
    require('../routes/auth').registerRoutes(rest);

};