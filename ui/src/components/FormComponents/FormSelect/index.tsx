import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Select, { SelectProps } from "@mui/material/Select";
import { SxProps } from "@mui/system";
import { FormHelperText } from "@mui/material";

import { capitalize } from "../../../utils/common";

interface Props<T> {
  labelId: string;
  label: string;
  required?: boolean;
  options: { label: string; value: string }[];
  selectProps?: SelectProps<T>;
  labelStyles?: SxProps;
  selectStyles?: SxProps;
  containerStyles?: { [key: string]: any };
  errorText?: string | false;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const FormSelect = ({
  labelId,
  label,
  options,
  required = false,
  labelStyles,
  selectStyles,
  selectProps,
  errorText = "",
  containerStyles,
}: Props<string | string[]>) => (
  <FormControl sx={{ ...containerStyles }} fullWidth required={required}>
    <InputLabel
      shrink
      id={labelId}
      error={!!errorText}
      sx={{
        background: "#fff",
        px: "0.2em",
        ...labelStyles,
      }}
    >
      {label}
    </InputLabel>
    <Select
      size="small"
      labelId={labelId}
      label={label}
      renderValue={() => {
        let selectValue;
        if (
          selectProps &&
          selectProps.value &&
          Array.isArray(selectProps.value)
        ) {
          const editedValues = selectProps?.value.map((item) => {
            const selectedOption = options.find(
              (option) => option.value === item
            )?.label;
            return selectedOption;
          });

          selectValue = capitalize((editedValues as string[]) || []);
        } else {
          selectValue = options.find(
            ({ value }) => value === selectProps?.value
          )?.label;
        }
        return typeof selectValue === "string" ? selectValue : "";
      }}
      value={selectProps?.value}
      sx={selectStyles}
      MenuProps={MenuProps}
      {...selectProps}
    >
      {options.map((option) => (
        <MenuItem key={option.label} value={option.value}>
          {selectProps?.multiple ? (
            <Checkbox
              size="small"
              checked={
                selectProps && selectProps.value
                  ? selectProps.value.includes(option.value)
                  : false
              }
            />
          ) : null}
          {option.label}
        </MenuItem>
      ))}
    </Select>
    <FormHelperText sx={{ color: "error.main" }}>{errorText}</FormHelperText>
  </FormControl>
);
