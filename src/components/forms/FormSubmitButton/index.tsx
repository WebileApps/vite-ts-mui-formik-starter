import { LoadingButton } from '@mui/lab';
import { ButtonProps, styled } from '@mui/material';
import { useFormikContext } from 'formik';

const StyledButton = styled(LoadingButton)(({ theme }) => ({
  padding: '10px 20px',
  boxShadow: theme.shadows[23],
  borderRadius: '8px',
  color: theme.palette.primary.light,
  textTransform: 'capitalize',
  fontSize: 16,
  fontWeight: 600,
  '& .MuiLoadingButton-loadingIndicator': {
    top: '30%',
  },
}));

export default function SubmitButton({
  label = 'Submit',
  variant = 'contained',
  ...props
}: ButtonProps & { label: string }): JSX.Element {
  const formikContext = useFormikContext();
  const { isSubmitting } = formikContext;

  return (
    <StyledButton
      sx={{
        display: 'block',
        width: '100%',
        maxWidth: '500px',
        margin: 'auto',
        color: 'primary.light',
        marginBottom: '20px',
        textTransform: 'unset',
      }}
      type="submit"
      // fullWidth={fullWidth}
      variant={variant}
      color="primary"
      {...props}
      loading={isSubmitting}
    >
      {label}
    </StyledButton>
  );
}
