const WASI = require("@wasmer/wasi").WASI;
const WasmFs = require("@wasmer/wasmfs").WasmFs;

const inputNumberField = document.getElementById("prime");
let inputNumberFieldValue = 0;

inputNumberField.addEventListener('change', () => {
    inputNumberFieldValue = inputNumberField.value;
});

// const usingSwift = (value) => {
//   fetch("https://cdn.jsdelivr.net/npm/@wasmer/wasi@0.12.0/lib/index.cjs.min.js")
//   .then((response) => {response.text()})
//   .then((text) => eval(text))
//   .then(() => {
//     console.log(exports)
//     //let wasi = new WASI();
//   })
//   //swiftMain();
// }

const promisify = require("util").promisify;
const fs = require("fs");
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

const setValue = (value, id) => {
    let element = document.getElementById(id);
    element.innerText = value + " ms";
} 

const startButtonClicked = () => {
    // usingJavaScript(inputNumberFieldValue);
    // usingC(inputNumberFieldValue);
    // usingRust(inputNumberFieldValue);
    // usingJava(inputNumberFieldValue);
    // usingSwift(inputNumberFieldValue);
    // usingGo(inputNumberFieldValue);
    main();
}