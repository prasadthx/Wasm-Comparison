import {WASI} from "https://cdn.skypack.dev/@wasmer/wasi";

//import wasiBindings from "https://cdn.skypack.dev/@wasmer/wasi/lib/bindings/browser";

import { WasmFs } from "https://cdn.skypack.dev/@wasmer/wasmfs";

import { lowerI64Imports } from "https://cdn.skypack.dev/@wasmer/wasm-transformer";

export const executeSwiftWasm = async (value) => {
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
  
  const response = await fetch("./swiftO2.wasm");
  const responseArrayBuffer = await response.arrayBuffer();

  // Instantiate the WebAssembly file
  const wasm_bytes = new Uint8Array(responseArrayBuffer).buffer;
  const lowered_wasm = await lowerI64Imports(wasm_bytes);
  let module = await WebAssembly.compile(lowered_wasm);
  let instance = await WebAssembly.instantiate(module, {
    ...wasi.getImports(module)
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