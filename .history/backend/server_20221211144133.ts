const cluster = require("node:cluster");
const totalCpus = require("node:os").cpus();

if (cluster.isPrimary) {
 console.log(`Master node:${process.pid} is running.`);

 // fork worker nodes
 for (let i = 1; i <= totalCpus.length; i++) cluster.fork();

 // listenting on worker node deaths
 cluster.on("exit", (worker: any, code: any, signal: any) => cluster.fork());

} else {
 const app = require("./app");

 // listening to the port
 app.listen(PORT, () => console.log(`Listening to the port ${PORT}`));
};