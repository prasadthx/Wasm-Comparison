// const WASI = require("@wasmer/wasi").WASI;
// const WasmFs = require("@wasmer/wasmfs").WasmFs;
import { WASI } from "@wasmer/wasi";
import { WasmFs } from "@wasmer/wasmfs";
import { fs } from "fs";
import { promisify } from "util";

// const promisify = require("util").promisify;
// const fs = require("fs");
const readFile = promisify(fs.readFile);

const main = async () => {
  // Instantiate a new WASI Instance
  const wasmFs = new WasmFs();
  let wasi = new WASI({
    args: [],
    env: {},
    bindings: {
      ...WASI.defaultBindings,
      fs: wasmFs.fs,
    },
  });

  const wasmBinary = await readFile("libs.wasm");

  // Instantiate the WebAssembly file
  let { instance } = await WebAssembly.instantiate(wasmBinary, {
    wasi_snapshot_preview1: wasi.wasiImport,
  });
  // Instantiate the WebAssembly file

  // Get the exported function
//   const addFn = instance.exports.add;
   console.log("2 + 3 = " + instance.exports.find_primes(2))

};

module.exports = main
