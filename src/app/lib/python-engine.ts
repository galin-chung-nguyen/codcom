// import { runCode, setEngine, setOptions } from 'client-side-python-runner';
// // OR import { runCode, setEngine, setOptions } from 'https://cdn.jsdelivr.net/npm/client-side-python-runner@latest';

// setOptions({ output: console.log });

// await setEngine('pyodide'); // Specify "skulpt", "pyodide" or "brython"
// await runCode(`print("printed from pyodide")`);
// // You can now see the print output in the browser console

// setOptions({
//   output: console.log, // Output from print(...)-functions
//   // error: null, // Throws an exception unless this is set to a function
//   // input: prompt, // How to feed the input(...)-function
//   pythonVersion: 3, // Preferred version
//   loadVariablesBeforeRun: true,
//   storeVariablesAfterRun: true,
//   // onLoading: (engine, isFirst) => {},
//   // onLoaded: (engine, isLast) => {},
// });