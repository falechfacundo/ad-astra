export const worker_url =
  typeof import.meta !== "undefined" && import.meta.env && import.meta.env.DEV
    ? "http://127.0.0.1:8787"
    : "https://ad-astra-propuestas-worker.faiafacundo.workers.dev";
