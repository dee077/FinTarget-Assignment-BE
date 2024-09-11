const cluster = require('cluster');
const http = require('http');
const redis = require('redis');

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < 2; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  // Worker processes
  const redisClient = redis.createClient({
    host: redisHost,
    port: redisPort,
  });

  redisClient.on('error', (err) => {
    console.log(`Redis error: ${err}`);
  });

  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Worker ${process.pid} handled the request\n`);
    console.log(`Worker ${process.pid} handled the request at ${Date.now()}`);
  }).listen(3000, () => {
    console.log(`Worker ${process.pid} started`);
  });
}
