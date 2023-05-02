import { Button, Typography } from '@mui/material';

export function ResendOtp({ counter = 10, onResendOtp }: any) {
  const disabled = counter > 0;
  const onResend = () => {
    if (!!onResendOtp && typeof onResendOtp === 'function') {
      onResendOtp();
    }
  };

  return (
    <Typography
      className="resend_otp"
      sx={{ marginBottom: '20px', marginTop: '10px', color: '#666666', fontSize: '14px' }}
    >
      <Button
        variant="text"
        disableRipple
        style={{
          color: '#666666',
          textDecorationColor: '#666666',
        }}
        sx={{
          textTransform: 'none',
          textDecoration: disabled ? 'none' : 'underline',
          lineHeight: 1.5,
          fontSize: '14px',
          fontWeight: 'normal',
          padding: 0,
        }}
        disabled={disabled}
        onClick={onResend}
      >
        Resend OTP
      </Button>
      {counter > 0 && (
        <>
          &nbsp;in&nbsp;<>{counter} sec</>
        </>
      )}
    </Typography>
  );
}
