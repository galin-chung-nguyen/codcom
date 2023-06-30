import React, { useEffect, useState } from 'react';
import NavBar from 'src/app/components/NavBar';
import Toast from 'src/app/components/Toast';
import CryptoAnalysisCodeEditor from 'src/main-board/components/CodeEditor';
// import PyodideProvider from 'src/main-board/components/pyodide-provider';

const Home = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="bg-[rgb(250,250,250)]">
      <NavBar />
      <div className="mx-auto w-full pt-[78px] 2xl:container">
        {loaded && <CryptoAnalysisCodeEditor />}
      </div>
      <Toast />
    </div>
  );
};

export default Home;
