import React from 'react';

const OutputWindow = ({ outputDetails }: any) => {
  const getOutput = () => {
    // let statusId = outputDetails?.status?.id;

    return (
      <pre className="px-2 py-1 text-xs font-normal text-green-500">
        {outputDetails.stdout !== null ? `${outputDetails.stdout}` : null}
      </pre>
    );
  };

  const getError = () => {
    const statusId = outputDetails?.status?.id;
    if (statusId !== 3) {
      return (
        <pre className="px-2 py-1 text-xs font-normal text-red-500">
          {outputDetails?.stderr}
        </pre>
      );
    }
    return <></>;
  };
  return (
    <>
      <h1 className="mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-xl font-bold text-transparent">
        Output
      </h1>
      <div className="h-56 w-full overflow-y-auto rounded-md border-2 border-black bg-white text-sm font-normal text-white">
        {outputDetails ? <>{getOutput()}</> : null}
        {outputDetails ? <>{getError()}</> : null}
      </div>
    </>
  );
};

export default OutputWindow;
