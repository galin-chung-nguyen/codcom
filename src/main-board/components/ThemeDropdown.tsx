// ThemeDropdown.js

import monacoThemes from 'monaco-themes/themes/themelist.json';
import React from 'react';
import Select from 'react-select';
import { customStyles } from 'src/app/constants/customStyles';

const ThemeDropdown = ({ handleThemeChange, theme }: any) => {
  return (
    <Select
      placeholder="Select Theme"
      // options={languageOptions}
      options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
        label: themeName,
        value: themeId,
        key: themeId,
      }))}
      value={theme}
      styles={customStyles}
      onChange={handleThemeChange}
    />
  );
};

export default ThemeDropdown;
