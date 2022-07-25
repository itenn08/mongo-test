import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SxProps } from "@mui/system";

interface Props {
  handleChange: (event: SelectChangeEvent) => void;
  options: { label: any; value: any }[];
  label: string;
  defaultOption: any;
  size: "small" | "medium";
  sx?: SxProps;
}

export const CustomSelect = ({
  handleChange,
  options,
  label,
  defaultOption,
  size,
  sx,
}: Props) => (
  <FormControl size={size} sx={{ width: "5rem", ...sx }}>
    <InputLabel>{label}</InputLabel>
    <Select value={defaultOption} label={label} onChange={handleChange}>
      {options.map((option, index) => (
        <MenuItem value={option.value} key={index}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
