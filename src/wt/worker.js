import { parentPort, workerData } from "node:worker_threads";
const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  try {
    const { n } = workerData;
    parentPort.postMessage(nthFibonacci(n));
  } catch (error) {
    parentPort.postMessage(error.message);
  }
};
sendResult();
