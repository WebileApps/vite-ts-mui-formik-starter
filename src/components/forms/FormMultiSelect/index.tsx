import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectProps,
  styled,
} from '@mui/material';
import { useField } from 'formik';

import Checkbox from '../../common/checkbox';
import DropdownArrowIcon from './icons/dropdown-icon';

const MultiSelect = styled(Select)(({ theme }) => ({
  // marginTop: '16px',
  marginBottom: '16px',
  backgroundColor: theme.palette.primary.light,
  borderRadius: 10,
  '& .MuiOutlinedInput-notchedOutline': {
    borderWidth: '0px',
    border: 'none',
    boxShadow: theme.shadows[24],
  },
  '& .MuiInputBase-input': {
    borderRadius: 10,
    position: 'relative',
    backgroundColor: theme.palette.primary.light,
    border: 'none',
    fontWeight: 400,
    fontSize: '1rem',
    // height: '20px',
    padding: theme.spacing(2, 2, 2, 2),
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&::placeholder': {
      fontSize: '16px',
      fontWeight: '400',
    },
  },
  '& .MuiSvgIcon-root': { marginRight: 12, fontSize: '1rem' },
}));

const SelectedValueChip = styled(Chip)(({ theme }) => ({
  border: '1px solid #193347',
  borderRadius: '60px',
  backgroundColor: theme.palette.primary.light,
}));

export type SelectOption = {
  label: string;
  value: any;
};

export type FormSelectProps = SelectProps & {
  name: string;
  options?: SelectOption[];
  placeholder?: string;
};

const MenuProps = {
  PaperProps: {
    sx: {
      // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      background: 'primary.light',
      boxShadow: '0px 12px 24px rgba(18, 17, 37, 0.28)',
      borderRadius: '10px',
    },
  },
};

export default function FormMultiSelect({
  name,
  fullWidth = true,
  label,
  margin = 'dense',
  options = [],
  placeholder = '',
  ...rest
}: FormSelectProps): JSX.Element {
  const [field, meta] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : '';
  const hasError = !!errorText;

  return (
    <FormControl fullWidth={fullWidth} margin={margin} error={hasError}>
      <InputLabel>{label}</InputLabel>
      <MultiSelect
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        input={<OutlinedInput label={label} />}
        renderValue={(selected: any) => {
          if (selected.length === 0) {
            return placeholder;
          } else {
            const allOption = options.find(
              (option: { label: string; value: string }) =>
                option.label.toLowerCase() === 'all',
            );
            return (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.indexOf(allOption!.value) !== -1 ? (
                  <SelectedValueChip key={'all'} label={'All'} />
                ) : (
                  selected.map((selectedValue: string) => (
                    <SelectedValueChip
                      key={selectedValue}
                      label={options?.find(({ value }) => value === selectedValue)?.label}
                    />
                  ))
                )}
              </Box>
            );
          }
        }}
        IconComponent={(props) => (
          <DropdownArrowIcon style={{ marginRight: '1em' }} {...props} />
        )}
        MenuProps={MenuProps}
        label={label}
        displayEmpty
        {...field}
        {...rest}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={field?.value?.indexOf(option.value) > -1} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </MultiSelect>
      {errorText && (
        <FormHelperText sx={{ marginLeft: 'unset' }}>{errorText}</FormHelperText>
      )}
    </FormControl>
  );
}
