import React from 'react';

const OutputWindow = ({ outputDetails }: any) => {
  const getComment = () => {
    // let statusId = outputDetails?.status?.id

    return (
      <div className="px-2 py-1 text-md font-normal text-yellow-500">
        Generated code comment:{' '}
        {outputDetails?.code_comment
          ? `${outputDetails.code_comment}`
          : 'no_comment'}
      </div>
    );
  };
  const getOutput = () => {
    // let statusId = outputDetails?.status?.id;

    return (
      <div className="px-2 py-1 text-md font-normal text-green-500">
        {outputDetails.stdout !== null ? `${outputDetails.stdout}` : null}
      </div>
    );
  };

  const getError = () => {
    const statusId = outputDetails?.status?.id;
    if (statusId !== 3) {
      return (
        <div className="px-2 py-1 text-md font-normal text-red-500">
          {outputDetails?.stderr}
        </div>
      );
    }
    return <></>;
  };
  return (
    <>
      <h1 className="mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-xl font-bold text-transparent">
        Output
      </h1>
      <div className="h-56 w-full rounded-md border-2 border-black bg-white text-sm font-normal text-white">
        <>{getComment()}</>
        {outputDetails ? <>{getOutput()}</> : null}
        {outputDetails ? <>{getError()}</> : null}
      </div>
    </>
  );
};

export default OutputWindow;
