import {ChangeEvent, useEffect, useState} from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiSwitch from '@mui/material/Switch';

interface Props {
  label?: string | JSX.Element;
  value?: boolean;
  getValue?: (val: boolean) => void;
  onChanged?: (val: boolean) => void;
}

export const Switch = ({label = '', value, getValue, onChanged}: Props) => {
  const getInitialValue = () => {
    if (typeof value === 'boolean') {
      return value;
    }
    return true;
  };

  const [checked, setChecked] = useState<boolean>(getInitialValue());

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);

    if (onChanged) {
      onChanged(event.target.checked);
    }
  };

  useEffect(() => {
    if (getValue) {
      getValue(checked);
    }
  }, [checked]);

  return (
    <FormGroup>
      <FormControlLabel
        control={<MuiSwitch checked={checked} onChange={handleChange} />}
        label={label}
      />
    </FormGroup>
  );
};
