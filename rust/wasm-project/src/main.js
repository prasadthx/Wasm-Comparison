fetch('../out/main.wasm').then(response =>
  response.arrayBuffer()
).then(bytes => WebAssembly.instantiate(bytes)).then(results => {
  instance = results.instance;
  console.time("Executed");
  document.getElementById("container").textContent = instance.exports.find_primes(20000);
  console.timeEnd("Executed");
}).catch(console.error);
