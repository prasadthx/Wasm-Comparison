import {WASI} from "https://cdn.skypack.dev/@wasmer/wasi";

import { WasmFs } from "https://cdn.skypack.dev/@wasmer/wasmfs";

const wasmFS = new WasmFs();
    let wasi = new WASI({
      args: [],
      env: {},
      bindings: {
        ...WASI.defaultBindings,
        fs:wasmFS.fs,
      },
    });

export const executeSwiftWasm = async (value) => {
  let returnObject = {"result": -1, "time": -1};
  let response = await fetch('swiftOs.wasm');
  response = await response.arrayBuffer();

  const { instance } = await WebAssembly.instantiate(response, {
    wasi_snapshot_preview1: wasi.wasiImport,
  });

  wasi.start(instance);
  const start = window.performance.now();
  const result = instance.exports.find_primes(value);
  const end = window.performance.now();
  const time = end - start;
  returnObject.result = result
  returnObject.time = time;
 return returnObject;
};