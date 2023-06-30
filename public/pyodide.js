!(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
    ? define(['exports'], factory)
    : factory(
        ((global =
          typeof globalThis !== 'undefined'
            ? globalThis
            : global || self).loadPyodide = {}),
      );
})(this, function (exports) {
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
    ? global
    : typeof self !== 'undefined' && self;
  const errorStackParser = { exports: {} };
  const stackframe = { exports: {} };
  !(function (module, exports) {
    module.exports = (function () {
      function _isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
      function _capitalize(str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
      }
      function _getter(p) {
        return function () {
          return this[p];
        };
      }
      const booleanProps = [
        'isConstructor',
        'isEval',
        'isNative',
        'isToplevel',
      ];
      const numericProps = ['columnNumber', 'lineNumber'];
      const stringProps = ['fileName', 'functionName', 'source'];
      const arrayProps = ['args'];
      const objectProps = ['evalOrigin'];
      const props = booleanProps.concat(
        numericProps,
        stringProps,
        arrayProps,
        objectProps,
      );
      function StackFrame(obj) {
        if (obj)
          for (let i = 0; i < props.length; i++)
            void 0 !== obj[props[i]] &&
              this[`set${_capitalize(props[i])}`](obj[props[i]]);
      }
      (StackFrame.prototype = {
        getArgs() {
          return this.args;
        },
        setArgs(v) {
          if (Object.prototype.toString.call(v) !== '[object Array]')
            throw new TypeError('Args must be an Array');
          this.args = v;
        },
        getEvalOrigin() {
          return this.evalOrigin;
        },
        setEvalOrigin(v) {
          if (v instanceof StackFrame) this.evalOrigin = v;
          else {
            if (!(v instanceof Object))
              throw new TypeError(
                'Eval Origin must be an Object or StackFrame',
              );
            this.evalOrigin = new StackFrame(v);
          }
        },
        toString() {
          const fileName = this.getFileName() || '';
          const lineNumber = this.getLineNumber() || '';
          const columnNumber = this.getColumnNumber() || '';
          const functionName = this.getFunctionName() || '';
          return this.getIsEval()
            ? fileName
              ? `[eval] (${fileName}:${lineNumber}:${columnNumber})`
              : `[eval]:${lineNumber}:${columnNumber}`
            : functionName
            ? `${functionName} (${fileName}:${lineNumber}:${columnNumber})`
            : `${fileName}:${lineNumber}:${columnNumber}`;
        },
      }),
        (StackFrame.fromString = function (str) {
          const argsStartIndex = str.indexOf('(');
          const argsEndIndex = str.lastIndexOf(')');
          const functionName = str.substring(0, argsStartIndex);
          const args = str
            .substring(argsStartIndex + 1, argsEndIndex)
            .split(',');
          const locationString = str.substring(argsEndIndex + 1);
          if (locationString.indexOf('@') === 0)
            var parts = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(
                locationString,
                '',
              ),
              fileName = parts[1],
              lineNumber = parts[2],
              columnNumber = parts[3];
          return new StackFrame({
            functionName,
            args: args || void 0,
            fileName,
            lineNumber: lineNumber || void 0,
            columnNumber: columnNumber || void 0,
          });
        });
      for (let i = 0; i < booleanProps.length; i++)
        (StackFrame.prototype[`get${_capitalize(booleanProps[i])}`] = _getter(
          booleanProps[i],
        )),
          (StackFrame.prototype[`set${_capitalize(booleanProps[i])}`] =
            (function (p) {
              return function (v) {
                this[p] = Boolean(v);
              };
            })(booleanProps[i]));
      for (let j = 0; j < numericProps.length; j++)
        (StackFrame.prototype[`get${_capitalize(numericProps[j])}`] = _getter(
          numericProps[j],
        )),
          (StackFrame.prototype[`set${_capitalize(numericProps[j])}`] =
            (function (p) {
              return function (v) {
                if (!_isNumber(v)) throw new TypeError(`${p} must be a Number`);
                this[p] = Number(v);
              };
            })(numericProps[j]));
      for (let k = 0; k < stringProps.length; k++)
        (StackFrame.prototype[`get${_capitalize(stringProps[k])}`] = _getter(
          stringProps[k],
        )),
          (StackFrame.prototype[`set${_capitalize(stringProps[k])}`] =
            (function (p) {
              return function (v) {
                this[p] = String(v);
              };
            })(stringProps[k]));
      return StackFrame;
    })();
  })(stackframe),
    (function (module, exports) {
      let StackFrame;
      let FIREFOX_SAFARI_STACK_REGEXP;
      let CHROME_IE_STACK_REGEXP;
      let SAFARI_NATIVE_CODE_REGEXP;
      module.exports =
        ((StackFrame = stackframe.exports),
        (FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+:\d+/),
        (CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m),
        (SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code])?$/),
        {
          parse(error) {
            if (
              void 0 !== error.stacktrace ||
              void 0 !== error['opera#sourceloc']
            )
              return this.parseOpera(error);
            if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP))
              return this.parseV8OrIE(error);
            if (error.stack) return this.parseFFOrSafari(error);
            throw new Error('Cannot parse given Error object');
          },
          extractLocation(urlLike) {
            if (urlLike.indexOf(':') === -1) return [urlLike];
            const parts = /(.+?)(?::(\d+))?(?::(\d+))?$/.exec(
              urlLike.replace(/[()]/g, ''),
            );
            return [parts[1], parts[2] || void 0, parts[3] || void 0];
          },
          parseV8OrIE(error) {
            return error.stack
              .split('\n')
              .filter(function (line) {
                return !!line.match(CHROME_IE_STACK_REGEXP);
              }, this)
              .map(function (line) {
                line.indexOf('(eval ') > -1 &&
                  (line = line
                    .replace(/eval code/g, 'eval')
                    .replace(/(\(eval at [^()]*)|(,.*$)/g, ''));
                let sanitizedLine = line
                  .replace(/^\s+/, '')
                  .replace(/\(eval code/g, '(')
                  .replace(/^.*?\s+/, '');
                const location = sanitizedLine.match(/ (\(.+\)$)/);
                sanitizedLine = location
                  ? sanitizedLine.replace(location[0], '')
                  : sanitizedLine;
                const locationParts = this.extractLocation(
                  location ? location[1] : sanitizedLine,
                );
                const functionName = (location && sanitizedLine) || void 0;
                const fileName =
                  ['eval', '<anonymous>'].indexOf(locationParts[0]) > -1
                    ? void 0
                    : locationParts[0];
                return new StackFrame({
                  functionName,
                  fileName,
                  lineNumber: locationParts[1],
                  columnNumber: locationParts[2],
                  source: line,
                });
              }, this);
          },
          parseFFOrSafari(error) {
            return error.stack
              .split('\n')
              .filter(function (line) {
                return !line.match(SAFARI_NATIVE_CODE_REGEXP);
              }, this)
              .map(function (line) {
                if (
                  (line.indexOf(' > eval') > -1 &&
                    (line = line.replace(
                      / line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,
                      ':$1',
                    )),
                  line.indexOf('@') === -1 && line.indexOf(':') === -1)
                )
                  return new StackFrame({ functionName: line });
                const functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
                const matches = line.match(functionNameRegex);
                const functionName =
                  matches && matches[1] ? matches[1] : void 0;
                const locationParts = this.extractLocation(
                  line.replace(functionNameRegex, ''),
                );
                return new StackFrame({
                  functionName,
                  fileName: locationParts[0],
                  lineNumber: locationParts[1],
                  columnNumber: locationParts[2],
                  source: line,
                });
              }, this);
          },
          parseOpera(e) {
            return !e.stacktrace ||
              (e.message.indexOf('\n') > -1 &&
                e.message.split('\n').length > e.stacktrace.split('\n').length)
              ? this.parseOpera9(e)
              : e.stack
              ? this.parseOpera11(e)
              : this.parseOpera10(e);
          },
          parseOpera9(e) {
            for (
              var lineRE = /Line (\d+).*script (?:in )?(\S+)/i,
                lines = e.message.split('\n'),
                result = [],
                i = 2,
                len = lines.length;
              i < len;
              i += 2
            ) {
              const match = lineRE.exec(lines[i]);
              match &&
                result.push(
                  new StackFrame({
                    fileName: match[2],
                    lineNumber: match[1],
                    source: lines[i],
                  }),
                );
            }
            return result;
          },
          parseOpera10(e) {
            for (
              var lineRE =
                  /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,
                lines = e.stacktrace.split('\n'),
                result = [],
                i = 0,
                len = lines.length;
              i < len;
              i += 2
            ) {
              const match = lineRE.exec(lines[i]);
              match &&
                result.push(
                  new StackFrame({
                    functionName: match[3] || void 0,
                    fileName: match[2],
                    lineNumber: match[1],
                    source: lines[i],
                  }),
                );
            }
            return result;
          },
          parseOpera11(error) {
            return error.stack
              .split('\n')
              .filter(function (line) {
                return (
                  !!line.match(FIREFOX_SAFARI_STACK_REGEXP) &&
                  !line.match(/^Error created at/)
                );
              }, this)
              .map(function (line) {
                let argsRaw;
                const tokens = line.split('@');
                const locationParts = this.extractLocation(tokens.pop());
                const functionCall = tokens.shift() || '';
                const functionName =
                  functionCall
                    .replace(/<anonymous function(: (\w+))?>/, '$2')
                    .replace(/\([^)]*\)/g, '') || void 0;
                functionCall.match(/\(([^)]*)\)/) &&
                  (argsRaw = functionCall.replace(/^[^(]+\(([^)]*)\)$/, '$1'));
                const args =
                  void 0 === argsRaw || argsRaw === '[arguments not available]'
                    ? void 0
                    : argsRaw.split(',');
                return new StackFrame({
                  functionName,
                  args,
                  fileName: locationParts[0],
                  lineNumber: locationParts[1],
                  columnNumber: locationParts[2],
                  source: line,
                });
              }, this);
          },
        });
    })(errorStackParser);
  const ErrorStackParser = errorStackParser.exports;
  const IN_NODE =
    typeof process !== 'undefined' &&
    process.release &&
    process.release.name === 'node' &&
    void 0 === process.browser;
  let nodeUrlMod;
  let nodeFetch;
  let nodeVmMod;
  let nodeFsPromisesMod;
  let loadBinaryFile;
  let loadScript;
  if (
    ((loadBinaryFile = IN_NODE
      ? async function (indexURL, path, _file_sub_resource_hash) {
          if (
            (path.startsWith('/') ||
              path.includes('://') ||
              (path = `${indexURL}${path}`),
            path.startsWith('file://') && (path = path.slice('file://'.length)),
            path.includes('://'))
          ) {
            const response = await nodeFetch(path);
            if (!response.ok)
              throw new Error(`Failed to load '${path}': request failed.`);
            return new Uint8Array(await response.arrayBuffer());
          }
          {
            const data = await nodeFsPromisesMod.readFile(path);
            return new Uint8Array(
              data.buffer,
              data.byteOffset,
              data.byteLength,
            );
          }
        }
      : async function (indexURL, path, subResourceHash) {
          const base = new URL(indexURL, location);
          const url = new URL(path, base);
          const options = subResourceHash ? { integrity: subResourceHash } : {};
          const response = await fetch(url, options);
          if (!response.ok)
            throw new Error(`Failed to load '${url}': request failed.`);
          return new Uint8Array(await response.arrayBuffer());
        }),
    globalThis.document)
  )
    loadScript = async (url) => await import(url);
  else if (globalThis.importScripts)
    loadScript = async (url) => {
      try {
        globalThis.importScripts(url);
      } catch (e) {
        if (!(e instanceof TypeError)) throw e;
        await import(url);
      }
    };
  else {
    if (!IN_NODE) throw new Error('Cannot determine runtime environment');
    loadScript = async function (url) {
      url.startsWith('file://') && (url = url.slice('file://'.length));
      url.includes('://')
        ? nodeVmMod.runInThisContext(await (await nodeFetch(url)).text())
        : await import(nodeUrlMod.pathToFileURL(url).href);
    };
  }
  function setStandardStreams(Module, stdin, stdout, stderr) {
    stdout && (Module.print = stdout),
      stderr && (Module.printErr = stderr),
      stdin &&
        Module.preRun.push(function () {
          Module.FS.init(
            (function (stdin) {
              const encoder = new TextEncoder();
              let input = new Uint8Array(0);
              let inputIndex = -1;
              function stdinWrapper() {
                try {
                  if (inputIndex === -1) {
                    let text = stdin();
                    if (text == null) return null;
                    if (typeof text !== 'string')
                      throw new TypeError(
                        `Expected stdin to return string, null, or undefined, got type ${typeof text}.`,
                      );
                    text.endsWith('\n') || (text += '\n'),
                      (input = encoder.encode(text)),
                      (inputIndex = 0);
                  }
                  if (inputIndex < input.length) {
                    const character = input[inputIndex];
                    return inputIndex++, character;
                  }
                  return (inputIndex = -1), null;
                } catch (e) {
                  throw (
                    (console.error('Error thrown in stdin:'),
                    console.error(e),
                    e)
                  );
                }
              }
              return stdinWrapper;
            })(stdin),
            null,
            null,
          );
        });
  }
  function finalizeBootstrap(API, config) {
    (API.runPythonInternal_dict = API._pyodide._base.eval_code('{}')),
      (API.importlib = API.runPythonInternal('import importlib; importlib'));
    const { import_module } = API.importlib;
    (API.sys = import_module('sys')), API.sys.path.insert(0, config.homedir);
    const globals = API.runPythonInternal('import __main__; __main__.__dict__');
    const builtins = API.runPythonInternal(
      'import builtins; builtins.__dict__',
    );
    let builtins_dict;
    API.globals =
      ((builtins_dict = builtins),
      new Proxy(globals, {
        get: (target, symbol) =>
          symbol === 'get'
            ? (key) => {
                let result = target.get(key);
                return (
                  void 0 === result && (result = builtins_dict.get(key)), result
                );
              }
            : symbol === 'has'
            ? (key) => target.has(key) || builtins_dict.has(key)
            : Reflect.get(target, symbol),
      }));
    const importhook = API._pyodide._importhook;
    importhook.register_js_finder(),
      importhook.register_js_module('js', config.jsglobals),
      importhook.register_unvendored_stdlib_finder();
    const pyodide = API.makePublicAPI();
    return (
      importhook.register_js_module('pyodide_js', pyodide),
      (API.pyodide_py = import_module('pyodide')),
      (API.pyodide_code = import_module('pyodide.code')),
      (API.pyodide_ffi = import_module('pyodide.ffi')),
      (API.package_loader = import_module('pyodide._package_loader')),
      (API.version = API.pyodide_py.__version__),
      (pyodide.pyodide_py = API.pyodide_py),
      (pyodide.version = API.version),
      (pyodide.globals = API.globals),
      pyodide
    );
  }
  async function loadPyodide(options = {}) {
    options.indexURL ||
      (options.indexURL = (function () {
        let err;
        try {
          throw new Error();
        } catch (e) {
          err = e;
        }
        const { fileName } = ErrorStackParser.parse(err)[0];
        const indexOfLastSlash = fileName.includes('/')
          ? fileName.lastIndexOf('/')
          : fileName.lastIndexOf('\\');
        if (indexOfLastSlash === -1)
          throw new Error(
            'Could not extract indexURL path from pyodide module location',
          );
        return fileName.slice(0, indexOfLastSlash);
      })()),
      options.indexURL.endsWith('/') || (options.indexURL += '/');
    const default_config = {
      fullStdLib: !0,
      jsglobals: globalThis,
      stdin: globalThis.prompt ? globalThis.prompt : void 0,
      homedir: '/home/pyodide',
      lockFileURL: `${options.indexURL}repodata.json`,
    };
    const config = Object.assign(default_config, options);
    await (async function () {
      if (!IN_NODE) return;
      if (
        ((nodeUrlMod = (await import('url')).default),
        (nodeFsPromisesMod = await import('fs/promises')),
        (nodeFetch = globalThis.fetch
          ? fetch
          : (await import('node-fetch')).default),
        (nodeVmMod = (await import('vm')).default),
        typeof require !== 'undefined')
      )
        return;
      const node_modules = {
        fs: await import('fs'),
        crypto: await import('crypto'),
        ws: await import('ws'),
        child_process: await import('child_process'),
      };
      globalThis.require = function (mod) {
        return node_modules[mod];
      };
    })();
    const pyodide_py_tar_promise = loadBinaryFile(
      config.indexURL,
      'pyodide_py.tar',
    );
    const Module = {
      noImageDecoding: !0,
      noAudioDecoding: !0,
      noWasmDecoding: !1,
      preloadedWasm: {},
      preRun: [],
    };
    const API = { config };
    (Module.API = API),
      setStandardStreams(Module, config.stdin, config.stdout, config.stderr),
      (function (Module, path) {
        Module.preRun.push(function () {
          try {
            Module.FS.mkdirTree(path);
          } catch (e) {
            console.error(
              `Error occurred while making a home directory '${path}':`,
            ),
              console.error(e),
              console.error("Using '/' for a home directory instead"),
              (path = '/');
          }
          (Module.ENV.HOME = path), Module.FS.chdir(path);
        });
      })(Module, config.homedir);
    const moduleLoaded = new Promise((r) => (Module.postRun = r));
    Module.locateFile = (path) => config.indexURL + path;
    const scriptSrc = `${config.indexURL}pyodide.asm.js`;
    await loadScript(scriptSrc),
      await _createPyodideModule(Module),
      await moduleLoaded,
      (Module.locateFile = (path) => {
        throw new Error("Didn't expect to load any more file_packager files!");
      });
    const pyodide_py_tar = await pyodide_py_tar_promise;
    !(function (Module, pyodide_py_tar) {
      const stream = Module.FS.open('/pyodide_py.tar', 'w');
      Module.FS.write(
        stream,
        pyodide_py_tar,
        0,
        pyodide_py_tar.byteLength,
        void 0,
        !0,
      ),
        Module.FS.close(stream);
      const code_ptr = Module.stringToNewUTF8(
        '\nfrom sys import version_info\npyversion = f"python{version_info.major}.{version_info.minor}"\nimport shutil\nshutil.unpack_archive("/pyodide_py.tar", f"/lib/{pyversion}/site-packages/")\ndel shutil\nimport importlib\nimportlib.invalidate_caches()\ndel importlib\n    ',
      );
      if (Module._PyRun_SimpleString(code_ptr)) throw new Error('OOPS!');
      Module._free(code_ptr), Module.FS.unlink('/pyodide_py.tar');
    })(Module, pyodide_py_tar),
      Module._pyodide_init();
    const pyodide = finalizeBootstrap(API, config);
    if (
      (pyodide.version.includes('dev') ||
        API.setCdnUrl(
          `https://cdn.jsdelivr.net/pyodide/v${pyodide.version}/full/`,
        ),
      await API.packageIndexReady,
      API.repodata_info.version !== pyodide.version)
    )
      throw new Error("Lock file version doesn't match Pyodide version");
    return (
      config.fullStdLib && (await pyodide.loadPackage(['distutils'])),
      pyodide.runPython("print('Python initialization complete')"),
      pyodide
    );
  }
  (globalThis.loadPyodide = loadPyodide),
    (exports.loadPyodide = loadPyodide),
    Object.defineProperty(exports, '__esModule', { value: !0 });
});
// # sourceMappingURL=pyodide.js.map
