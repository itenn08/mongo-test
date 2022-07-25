import { TextFieldProps } from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { InputLabelProps } from "@mui/material/InputLabel";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormInput from "../FormInput";

interface Props {
  defaultDate?: Date | null;
  getSelectedDate?: (state: Date | null) => void;
  containerStyles?: { [key: string]: any };
  minDate?: Date;
  maxDate?: Date;
  textFieldProps?: TextFieldProps;
  inputLabelProps?: InputLabelProps;
  reset?: boolean;
  getReset?: (reset: boolean) => void;
}

export const DatePicker = ({
  defaultDate = null,
  getSelectedDate,
  containerStyles,
  minDate,
  maxDate,
  textFieldProps,
  inputLabelProps,
  reset = false,
  getReset = () => {},
}: Props) => {
  const [value, setValue] = useState<Date | null>(defaultDate);

  useEffect(() => {
    setValue(defaultDate);
  }, []);

  useEffect(() => {
    if (reset) {
      setValue(defaultDate);
      if (getReset) getReset(reset);
    }
  }, [reset]);

  useEffect(() => {
    if (getSelectedDate) {
      getSelectedDate(value);
    }
  }, [value]);

  return (
    <Box sx={{ ...containerStyles }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MuiDatePicker
          inputFormat="dd.MM.yyyy"
          mask="__.__.____"
          value={value}
          minDate={minDate}
          maxDate={maxDate}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <FormInput
              props={{
                ...params,
                size: "small",
                ...textFieldProps,
                onKeyDown: (e) => {
                  e.preventDefault();
                },
              }}
              inputLabelProps={inputLabelProps}
            />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
};
