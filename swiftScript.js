import {WASI} from "https://cdn.skypack.dev/@wasmer/wasi";
//import { lowerI64Imports } from "@wasmer/wasm-transformer"

//import wasiBindings from "https://cdn.skypack.dev/@wasmer/wasi/lib/bindings/browser";
 
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

  let { instance } = await WebAssembly.instantiate(response, {
    wasi_snapshot_preview1: wasi.wasiImport,
  });

  wasi.start(instance);
  let start = window.performance.now();
  let result = instance.exports.find_primes(value);
  let end = window.performance.now();
  let time = end - start;
  console.log("Time: " + time + " result: " + result);
  returnObject.result = result
  returnObject.time = time;
  console.log(returnObject);
  return returnObject;
};