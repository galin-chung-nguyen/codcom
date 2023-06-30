// Landing.js
import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import Footer from 'src/app/components/Footer';
import { languageOptions } from 'src/app/constants/languageOptions';
import { defineTheme } from 'src/app/lib/defineTheme';
import { classnames } from 'src/app/utils/general';
import CodeEditorWindow from 'src/main-board/components/CodeEditorWindow';
import CustomInput from 'src/main-board/components/CustomInput';
import LanguagesDropdown from 'src/main-board/components/LanguagesDropdown';
import OutputDetails from 'src/main-board/components/OutputDetails';
import OutputWindow from 'src/main-board/components/OutputWindow';
import ThemeDropdown from 'src/main-board/components/ThemeDropdown';

const defaultCode = `# write your code here`;

const CryptoAnalysisCodeEditor = () => {
  const [code, setCode] = useState(
    localStorage.getItem(`code.${languageOptions[0].id.toString()}`) ||
      defaultCode,
  );
  const [customInput, setCustomInput] = useState(
    localStorage.getItem(`input.${languageOptions[0].id.toString()}`) || '',
  );
  const [outputDetails, setOutputDetails] = useState<any>(null);
  const [processing, setProcessing] = useState(false);
  const [theme, setTheme] = useState('cobalt');
  const [language, setLanguage] = useState(languageOptions[0]);
  const jwtToken = useSelector((state: any) => state.jwtToken);

  const onSelectChange = (sl: any) => {
    console.log('selected Option...', sl.id.toString());
    setLanguage(sl);
    console.log(`code.${sl.id.toString()}`);
    console.log(localStorage.getItem(`code.${sl.id.toString()}`));
    console.log(defaultCode);
    setCode(localStorage.getItem(`code.${sl.id.toString()}`) || defaultCode);
    setCustomInput(localStorage.getItem(`input.${sl.id.toString()}`) || '');
  };

  // useEffect(() => {
  //   if (enterPress && ctrlPress) {
  //     console.log("enterPress", enterPress);
  //     console.log("ctrlPress", ctrlPress);
  //     handleCompile();
  //   }
  // }, [ctrlPress, enterPress]);
  const onChange = (action: any, data: any) => {
    switch (action) {
      case 'code': {
        localStorage.setItem(`code.${language.id.toString()}`, data);
        setCode(data);
        break;
      }
      default: {
        console.warn('case not handled!', action, data);
      }
    }
  };

  const onInputChange = (value: string) => {
    setCustomInput(value);
    localStorage.setItem(`input.${language.id.toString()}`, value);
  };

  const handleCompile = async () => {
    // We will come to the implementation later in the code
    if (processing) return;
    setProcessing(true);

    const { submission } = await fetch('/api/code-runner/compile', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        code,
        customInput,
        languageId: language.id,
      }),
    })
      .then((result) => result.json())
      .then(
        ({
          error_code,
          error_message,
          status,
          submission,
        }: {
          error_code: any;
          error_message: string;
          status: string;
          submission: any;
        }) => {
          console.log({ error_code, error_message, status, submission });

          if (error_message) {
            throw new Error(error_message);
          } else {
          }

          if (submission.submission_status !== 'FULLY_FINISHED')
            setOutputDetails({
              status: {
                type: status,
                id: error_message || submission.error ? -1 : 3,
                description: submission?.submission_status || 'FAILED',
              },
              stdout: submission?.output || '',
              stderr: error_message || submission.error,
              time: submission?.running_time || -1,
              memory: submission?.memory_used || -1,
            });

          return { submission };
        },
      )
      .catch((err) => {
        showErrorToast(err?.message);
        setOutputDetails({
          status: {
            type: 'failed',
            id: -1,
            description: 'ERROR',
          },
          stderr: err?.message || 'Unexpected internal error',
          stdout: '',
          time: -1,
          memory: -1,
        });
        console.log(err);

        return {
          submission: {
            status: 'ERROR',
          },
        };
      });

    if (submission.submission_status === 'FULLY_FINISHED') {
      showSuccessToast(`Submission #${submission.id} executed successfully!`);
      setOutputDetails({
        status: {
          type: 'success',
          id: 3,
          description: submission.submission_status,
        },
        stdout: submission?.output || '',
        stderr: '',
        time: submission?.running_time || -1,
        memory: submission?.memory_used || -1,
      });
    }

    // await execCode();

    setProcessing(false);
  };

  // Landing.js - handleThemeChange() function

  function handleThemeChange(th: any) {
    const theme = th;
    console.log('theme...', theme);

    if (['light', 'vs-dark'].includes(theme?.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme?.value).then(() => setTheme(theme));
    }
  }

  useEffect(() => {
    defineTheme('oceanic-next').then(() =>
      // setTheme({ value: 'oceanic-next', label: 'Oceanic Next' }),
      setTheme(() => 'oceanic-next') //{ value: 'oceanic-next', label: 'Oceanic Next' }),
    );
  }, []);

  const showSuccessToast = (msg: any) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg: any) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      {/* <Script src="https://cdn.jsdelivr.net/pyodide/dev/full/pyodide.js" onReady={() => {pythonExec()}} /> */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="h-4 w-full border-t-[1px]" />
      <div className="flex flex-row">
        <div className="px-4 py-2">
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
      </div>
      <div className="flex flex-row items-start space-x-4 p-4">
        <div className="flex h-full w-full flex-col items-end justify-start">
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme}
          />
        </div>

        <div className="right-container flex w-[30%] shrink-0 flex-col">
          <OutputWindow outputDetails={outputDetails} />
          <div className="flex flex-col items-end">
            <CustomInput
              customInput={customInput}
              setCustomInput={onInputChange}
            />
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                'z-10 mt-4 shrink-0 rounded-md border-2 border-black bg-white px-4 py-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition duration-200 hover:shadow',
                !code ? 'opacity-50' : '',
              )}
            >
              {processing ? 'Processing...' : 'Compile and Execute'}
            </button>
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default CryptoAnalysisCodeEditor;
