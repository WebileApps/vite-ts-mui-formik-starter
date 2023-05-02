import {
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';
import { useField } from 'formik';

import Checkbox from '../../common/checkbox';

export type FormCheckboxProps = CheckboxProps & {
  name: string;
  label: string;
  fullWidth?: boolean;
  margin?: 'dense' | 'none';
};

export default function FormCheckbox({
  fullWidth = true,
  margin = 'dense',
  label,
  name,
  ...props
}: FormCheckboxProps): JSX.Element {
  const [field, meta] = useField(name);
  const { value: checked } = field;
  const errorText = meta.error && meta.touched ? meta.error : '';
  const hasError = !!errorText;
  return (
    <FormControl fullWidth={fullWidth} margin={margin} error={hasError}>
      <FormControlLabel
        control={<Checkbox {...field} checked={checked} {...props} />}
        label={label}
      ></FormControlLabel>
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  );
}
