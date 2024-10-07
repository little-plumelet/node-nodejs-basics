import { Worker, isMainThread } from "node:worker_threads";
import { cpus } from "node:os";

const performCalculations = async () => {
  const coresNumber = cpus().length;
  const workers = [];

  if (isMainThread) {
    for (let n = 0; n < coresNumber; n++) {
      const workerPr = new Promise((resolve) => {
        const res = {
          status: null,
          data: null,
        };

        const worker = new Worker("./src/wt/worker.js", {
          workerData: { n: n + 10 },
        });
        worker.on("message", (result) => {
          res.data = result;
          res.status = "resolved";
          resolve(res);
        });
        worker.on("error", () => {
          res.status = "error";
          resolve(res);
        });
        worker.on("exit", (code) => {
          if (code !== 0) {
            res.status = "error";
            resolve(res);
          }
        });
      });

      workers.push(workerPr);
    }
  }

  const results = await Promise.all(workers);
  console.log(results);
};

await performCalculations();
