const cluster = require("cluster");
const totalCpus = require("os").cpus().length;

if (cluster.isMaster) {
 console.log(`Master node:${process.pid} is running.`);

 // fork worker nodes
 for (let i = 1; i <= totalCpus; i++) {
  cluster.fork();
 }

 // listenting to the worker node deaths
 cluster.on("exit", (worker: any, code: any, signal: any) => {
  console.log(`Worker node:${worker.process.pid} died.`);

  // fork another worker node
  cluster.fork();
 });

} else {
 require("./app");
}