/**
 * Created by workbook on 12.04.2017.
 */

import cluster from 'cluster';
import models from './server/models';


function startWorker() {
    let worker = cluster.fork();
    console.log('CLUSTER: Worker %d started', worker.id);
}

if(cluster.isMaster){
    require('os').cpus().forEach(() => {
        startWorker();
    });

    // log any workers that disconnect; if a worker disconnects, it
    // should then exit, so we'll wait for the exit event to spawn
    // a new worker to replace it
    cluster.on('disconnect', (worker) => {
        console.log('CLUSTER: Worker %d disconnected from the cluster.',
            worker.id);
    });

    // when a worker dies (exits), create a worker to replace it
    cluster.on('exit', function(worker, code, signal){
        console.log('CLUSTER: Worker %d died with exit code %d (%s)',
            worker.id, code, signal);
        startWorker();
    });

} else {

    models.sequelize.sync().then(() => {
        // start our app on worker; see index.js
        require('./server/index.js')();
    });
}