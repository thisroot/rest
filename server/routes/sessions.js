/**
 * Created by workbook on 27.04.2017.
 */
import Client from 'node-rest-client';
import models  from '../models';
import  passGenerator from 'password-generator';
import config from '../../etc/configures'
import parseRawHeaders from '../utils/utils';

let client = new Client.Client({
    connection:{rejectUnauthorized:false}});


let logger = require('../utils/logger')();

module.exports = {

    registerRoutes: function (rest) {
        rest.get(/^\/session(.json)?$/g, this.session_start_app);
    },

    session_start_app: function (req, content, cb) {

       return cb( null, "privet"
            , { statusCode: 201,
                headers: {
                ETag: "10c24bc-4ab-457e1c1f"
            }});


        let headers  = parseRawHeaders(req.rawHeaders);

        console.log(headers);

        let args = { data: content,
            headers: {
                'QuickBlox-REST-API-Version': req.headers['quickblox-rest-api-version'] || config.QB.vAPI,
                'Content-Type': 'application/json'}
        };


        client.post(
            config.QB.urlAPI + "/session", args,
             (data, response) => {
                // parsed response body as js object

                // raw response
                console.log(parseRawHeaders(response.rawHeaders));

                 cb( null, data
                 , { statusCode: 201, headers: {
                     ETag: "10c24bc-4ab-457e1c1f"
                 }});
            });
    }
};