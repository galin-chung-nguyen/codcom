import React from 'react';
import { classnames } from 'src/app/utils/general';

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      {' '}
      <textarea
        rows={5}
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder="Custom input"
        className={classnames(
          'z-10 mt-2 w-full rounded-md border-2 border-black bg-white px-4 py-2 shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition duration-200 hover:shadow focus:outline-none',
        )}
      />
    </>
  );
};

export default CustomInput;
