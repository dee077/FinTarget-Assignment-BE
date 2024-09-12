const cluster = require('cluster');
require('dotenv').config();

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  NONO_OF_WORKER_PROCESSES=process.env.NO_OF_WORKER_PROCESSES
  // Fork workers
  for (let i = 0; i < NONO_OF_WORKER_PROCESSES; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  // Worker processes
  PORT=process.env.PORT
  const { server } = require('./server.js')
  server()
}
