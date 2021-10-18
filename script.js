import { executeSwiftWasm } from "./swiftScript.js";
import { findPrimes } from "./javascript_code.js";

const inputNumberField = document.getElementById("prime");
let inputNumberFieldValue = 0;

inputNumberField.addEventListener('change', () => {
    inputNumberFieldValue = inputNumberField.value;
});

const startbutton = document.getElementById("startFunction");

const usingJavaScript = (value) => {
    //console.log(findPrimes());
    const start = window.performance.now();
    const result = findPrimes(value);
    const end = window.performance.now();
    const time = end - start;
    setValue(`${time} ms`, "JavaScriptSpeed");
    setValue(result, "JavaScriptResults");
}

const usingC = (value) => {
    const start = window.performance.now();
    const result = Module._findPrimes(value);
    const end = window.performance.now();
    const time = end - start;
    setValue(`${time} ms`, "CSpeed");
    setValue(result, "CResults");
}

const usingRust = (value) => {
    fetch('rustWasm.wasm').then(response =>
        response.arrayBuffer()
      ).then(bytes => WebAssembly.instantiate(bytes)).then(results => {
        const instance = results.instance;
        const start = window.performance.now();
        const result = instance.exports.find_primes(value);
        const end = window.performance.now();
        const time = end - start;
        setValue(`${time} ms`, "RustSpeed");
        setValue(result, "RustResults")
      }).catch(console.error);
}

const usingJava = (value) => {
    fetch('./javaCode.wasm').then(response =>
        response.arrayBuffer()
    ).then(bytes =>
        WebAssembly.instantiate(bytes)
    ).then(results => {
        const instance = results.instance;
        const start = window.performance.now();
        const result = instance.exports.findPrimes(value);
        const end = window.performance.now();
        const time = end - start;
        setValue(`${time} ms`, "JavaSpeed");
        setValue(result, "JavaResults")
      }).catch(console.error);
}

const usingSwift = async (value) => {
    executeSwiftWasm(value).then( (results) => {
        const {result, time} = results;
        setValue(`${time} ms`, "SwiftSpeed");
        setValue(result, "SwiftResults");
    })
}

const usingGo = (value) => {
    const go = new Go();
    const WASM_FILE = 'goCode.wasm';
    let goWasm;
    fetch(WASM_FILE).then(response =>
      response.arrayBuffer()
    ).then(bytes => WebAssembly.instantiate(bytes, go.importObject)).then(results => {
      goWasm = results.instance;
      go.run(goWasm)
      const start = window.performance.now();
      const result = goWasm.exports.findPrimes(value);
      const end = window.performance.now();
      const time = end - start;
      setValue(`${time} ms`, "GoSpeed");
      setValue(result, "GoResults");
    }).catch(console.error);

}

const setValue = (value, id) => {
    let element = document.getElementById(id);
    element.innerText = value;
} 

async function startButtonClicked(value){
    usingJavaScript(inputNumberFieldValue);
    usingC(inputNumberFieldValue);
    usingRust(inputNumberFieldValue);
    usingJava(inputNumberFieldValue);
    try {
        await usingSwift(inputNumberFieldValue);
    } catch (error) {
        console.log(error);
    }
    
    usingGo(inputNumberFieldValue);
}



startbutton.addEventListener("click", async () => await startButtonClicked());
