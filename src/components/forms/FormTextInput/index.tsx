import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  InputBaseProps,
  styled,
  Typography,
} from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { ReactElement, useState } from 'react';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2b2b2b',
  boxShadow: theme.shadows[24],
  padding: '10px 12px',
  borderRadius: 10,
  '& .MuiInputBase-input': {
    position: 'relative',
    fontSize: 16,
    width: '100%',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
  },
}));

function FormTextInput({
  name,
  label,
  fullWidth = true,
  ...rest
}: InputBaseProps & { name: string; label: string | ReactElement }): JSX.Element {
  const formikContext = useFormikContext();
  const { isSubmitting: disabled } = formikContext;
  const [field, meta] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : '';
  const hasError = !!errorText;
  return (
    <>
      <Typography
        sx={{
          fontSize: '14px',
          lineHeight: '22px',
          letterSpacing: '0.01em',
          mb: '14px',
        }}
      >
        {label}
      </Typography>
      <FormControl variant="standard" sx={{ mb: 3 }} fullWidth={fullWidth}>
        <BootstrapInput id={`${name}-input`} disabled={disabled} {...field} {...rest} />
        <Typography
          sx={{
            display: 'flex',
            paddingLeft: '0.3em',
            color: 'error.dark',
            fontSize: '14px',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          {hasError && (
            <>
              <InfoOutlinedIcon sx={{ fontSize: '16px' }} />
              <span>{errorText}</span>
            </>
          )}
        </Typography>
      </FormControl>
    </>
  );
}

export function FormPasswordInput({
  ...rest
}: InputBaseProps & { name: string; label: string | ReactElement }): JSX.Element {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <FormTextInput
      {...rest}
      type={passwordVisible ? 'text' : 'password'}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            edge="end"
            color="primary"
            onClick={() => {
              setPasswordVisible(!passwordVisible);
            }}
            disableRipple
          >
            {passwordVisible ? <VisibilityIcon /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
    ></FormTextInput>
  );
}
export default FormTextInput;
