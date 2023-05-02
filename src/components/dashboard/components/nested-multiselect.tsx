import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  styled,
} from '@mui/material';
import { useField } from 'formik';
import { ChangeEvent } from 'react';

import Checkbox from '../../common/checkbox';
import { FormSelectProps } from '../../forms/FormMultiSelect';

const OptionsContainer = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(5),
  display: 'flex',
  flexDirection: 'column',
}));

const SELECTED_VALUE = 'selected';
function NestedMultiSelect({
  allPropertyValue = 'all',
  allPropertyLabel = 'All',
  selectPropertyLabel = 'Select',
  name,
  options = [],
}: // ...rest
FormSelectProps & {
  allPropertyValue: string;
  allPropertyLabel: string;
  selectPropertyLabel: string;
}) {
  const [field, meta, { setValue }] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : '';
  const hasError = !!errorText;
  const selectedOptions = field.value || [allPropertyValue];
  const radioValue =
    selectedOptions.length === 1 && selectedOptions[0] === allPropertyValue
      ? allPropertyValue
      : SELECTED_VALUE;
  const handleRadioValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const radio =
      event.target.value === allPropertyValue ? [allPropertyValue] : [options[0].value];
    setValue(radio);
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (radioValue === allPropertyValue && event.target.checked) {
      setValue([event.target.name]);
    } else {
      if (event.target.checked) {
        [...field.value].length === options.length - 1
          ? setValue([allPropertyValue])
          : setValue(Array.from(new Set([event.target.name])));
      } else {
        [...field.value].filter((val) => val != event.target.name).length === 0
          ? setValue([allPropertyValue])
          : setValue([...field.value].filter((val) => val != event.target.name));
      }
    }
  };

  return (
    <FormControl error={hasError}>
      <RadioGroup value={radioValue} onChange={handleRadioValueChange}>
        <FormControlLabel
          value={allPropertyValue}
          label={allPropertyLabel}
          control={<Radio size="small" />}
        />
        <FormControlLabel
          value={SELECTED_VALUE}
          label={selectPropertyLabel}
          control={<Radio size="small" />}
        />

        {options.length > 0 && (
          <OptionsContainer>
            {options.map(({ label: optionLabel, value: optionValue }: any) => (
              <FormControlLabel
                key={optionValue}
                label={optionLabel}
                control={
                  <Checkbox
                    checked={field.value.includes(optionValue)}
                    name={optionValue}
                    onChange={handleCheckboxChange}
                  />
                }
              />
            ))}
          </OptionsContainer>
        )}
      </RadioGroup>
    </FormControl>
  );
}

export default NestedMultiSelect;
