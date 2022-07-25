import FormControl from '@mui/material/FormControl';
import { InputLabelProps } from '@mui/material/InputLabel';
import TextField, { TextFieldProps } from '@mui/material/TextField';

interface Props {
  containerStyles?: { [key: string]: any };
  props?: TextFieldProps;
  inputLabelProps?: InputLabelProps;
}

const FormInput = ({ props, containerStyles, inputLabelProps }: Props) => (
  <FormControl sx={{ ...containerStyles }} fullWidth>
    <TextField
      InputLabelProps={{
        shrink: true,
        ...inputLabelProps,
      }}
      size="small"
      {...props}
      label={props!.label as string}
      helperText={props!.helperText as string}
      placeholder={props!.placeholder as string}
    />
  </FormControl>
);

export default FormInput;
