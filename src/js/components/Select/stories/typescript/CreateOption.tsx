import React, { useState } from 'react';
import { Box, Select } from 'grommet';
import { OptionType } from '../../index';
// the prefix name of the Create option entry
const prefix = 'Create';

const defaultOptions: OptionType[] = [];
for (let i = 1; i <= 5; i += 1) {
  defaultOptions.push(`option ${i}`);
}

const updateCreateOption = (text: string) => {
  const len = defaultOptions.length;
  if (typeof defaultOptions[len - 1] === 'string') {
    if ((defaultOptions[len - 1] as string).includes(prefix)) {
      defaultOptions.pop();
    }
  }
  defaultOptions.push(`${prefix} '${text}'`);
};

// improving Search support of special characters
const getRegExp = (text) => {
  // The line below escapes regular expression special characters:
  // [ \ ^ $ . | ? * + ( )
  const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

  // Create the regular expression with modified value which
  // handles escaping special characters. Without escaping special
  // characters, errors will appear in the console
  return new RegExp(escapedText, 'i');
};

export const CreateOption = () => {
  const [options, setOptions] = useState<OptionType[]>(defaultOptions);
  const [value, setValue] = useState<OptionType | OptionType[] | undefined>(
    undefined,
  );
  const [searchValue, setSearchValue] = useState('');

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="start" pad="large">
      <Select
        open
        size="medium"
        placeholder="Select"
        value={value}
        options={options}
        onChange={({ option }) => {
          if (typeof option === 'string' && option.includes(prefix)) {
            defaultOptions.pop(); // remove Create option
            defaultOptions.push(searchValue);
            setValue(searchValue);
          } else {
            setValue(option);
          }
        }}
        onClose={() => setOptions(defaultOptions)}
        onSearch={(text: string) => {
          updateCreateOption(text);
          const exp = getRegExp(text);
          setOptions(defaultOptions.filter((o) => exp.test(String(o))));
          setSearchValue(text);
        }}
      />
    </Box>
    // </Grommet>
  );
};

CreateOption.storyName = 'Create option';

CreateOption.args = {
  full: true,
};

export default {
  title: 'Input/Select/Create option',
};
