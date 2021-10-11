const inputNumberField = document.getElementById("prime");
let inputNumberFieldValue = 0;

inputNumberField.addEventListener('change', () => {
    inputNumberFieldValue = inputNumberField.value;
});

const usingJavaScript = (value) => {
    let start = window.performance.now();
    console.log(findPrimes(value));
    let end = window.performance.now();
    let time = end - start;
    setValue(time, "JavaScriptSpeed");
}

const usingC = (value) => {
    fetch('primeNo_C_Code.wasm').then(response =>
        response.arrayBuffer()
      ).then(bytes => WebAssembly.instantiate(bytes)).then(results => {
        instance = results.instance;
        let start = window.performance.now();
        Module._findPrimes(value);
        let end = window.performance.now();
        let time = end - start;
        setValue(time, "CSpeed");
      }).catch(console.error);
}

const usingRust = (value) => {
    fetch('rustCode.wasm').then(response =>
        response.arrayBuffer()
      ).then(bytes => WebAssembly.instantiate(bytes)).then(results => {
        instance = results.instance;
        let start = window.performance.now();
        instance.exports.find_primes(value);
        let end = window.performance.now();
        let time = end - start;
        setValue(time, "RustSpeed");
      }).catch(console.error);
}

const setValue = (value, id) => {
    let element = document.getElementById(id);
    element.innerText = value + " ms";
} 

const startButtonClicked = () => {
    usingJavaScript(inputNumberFieldValue);
    usingC(inputNumberFieldValue);
    usingRust(inputNumberFieldValue);
}