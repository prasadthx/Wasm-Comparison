import {WASI} from "https://cdn.skypack.dev/@wasmer/wasi";

import { WasmFs } from "https://cdn.skypack.dev/@wasmer/wasmfs";

export async function executeSwiftWasm(value){
  const wasmFS = new WasmFs();
  let wasi = new WASI({
    args: [],
    env: {},
    bindings: {
      ...WASI.defaultBindings,
      fs:wasmFS.fs,
    },
  });
  let returnObject = {"result": -1, "time": -1};
  
  try {
        const response = await fetch("./swiftO2.wasm");
        const bytes = await response.arrayBuffer();

        // Instantiate the WebAssembly file
        const {instance} = await WebAssembly.instantiate(bytes, {
            wasi_snapshot_preview1:wasi.wasiImport
        })
        
        wasi.start(instance);

        const start = window.performance.now();
        const result = instance.exports.find_primes(value);
        const end = window.performance.now();
        const time = end - start;
        returnObject.result = result
        returnObject.time = time;
  } catch (error) {
      console.log(error);
  }

 return returnObject;
};