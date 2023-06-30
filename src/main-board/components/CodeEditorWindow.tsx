// CodeEditorWindow.js

import Editor from '@monaco-editor/react';
import React from 'react';

const CodeEditorWindow = ({ onChange, language, code, theme }: any) => {
  return (
    <div className="overlay shadow-4xl h-full w-full overflow-hidden rounded-md">
      <Editor
        height="85vh"
        width="100%"
        language={language || 'javascript'}
        value={code}
        theme={theme}
        defaultValue="// some comment"
        onChange={(newValue) => onChange('code', newValue)}
      />
    </div>
  );
};
export default CodeEditorWindow;
