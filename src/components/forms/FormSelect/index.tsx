import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';
import { useField } from 'formik';

export type SelectOption = {
  label: string;
  value: any;
};

export type FormSelectProps = SelectProps & {
  name: string;
  options?: SelectOption[];
};

export default function FormSelect({
  name,
  fullWidth = true,
  label,
  margin = 'dense',
  options = [],
  ...rest
}: FormSelectProps): JSX.Element {
  const [field, meta] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : '';
  const hasError = !!errorText;
  return (
    <FormControl fullWidth={fullWidth} margin={margin} error={hasError}>
      <InputLabel>{label}</InputLabel>
      <Select label={label} {...field} {...rest}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  );
}
