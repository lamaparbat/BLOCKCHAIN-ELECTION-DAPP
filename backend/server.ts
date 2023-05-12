// require("./scripts/switch-node-version");
const cluster = require("cluster");
const totalCpus = require("os").cpus();

// if (cluster.isPrimary) {
//   console.log(`Master node:${process.pid} is running.`);

//   // fork worker nodes
//   for (let i = 1; i <= totalCpus.length; i++) cluster.fork();

//   // listenting on worker node deaths
//   cluster.on("exit", (worker: any, code: any, signal: any) => cluster.fork());

// } else {
//   const app = require("./app");
//   const PORT = process.env.PORT || 8088;
//   // listening to the port
//   app.listen(PORT, () => console.log(`Listening to the port ${PORT}`));
// };


const _app = require("./app");
const PORT = process.env.PORT || 9999;
// listening to the port
_app.listen(PORT, () => console.log(`Listening to the port ${PORT}`));
