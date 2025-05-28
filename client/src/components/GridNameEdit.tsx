import { TextField } from '@mui/material';
import { useState } from 'react';

interface IProps {
  value?: string;
  onChange?: (value: string) => void;
}

const GridNameEdit = (props: IProps) => {
  const [value, setValue] = useState<string>(props.value || '');

  return (
    <TextField
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
        if (props.onChange) {
          props.onChange(event.target.value);
        }
      }}
    />
  );
};

export default GridNameEdit;
