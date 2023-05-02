import { Divider, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';

import SubmitButton from '../forms/FormSubmitButton';
import FormTextInput from '../forms/FormTextInput';
import { useLoginContext } from './data/login.context';

const OTPSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^[0-9]{1,6}$/, 'Enter a valid OTP')
    .required('OTP is a required field')
    //! For dev
    .equals(['123456'], 'Please enter 123456 only'),
});

export default function OtpScreen() {
  const navigate = useNavigate();
  const { userDetails: user, setOtp } = useLoginContext();

  return (
    <>
      <Typography variant="h4" sx={{ pb: 1.5 }}>
        Enter OTP
      </Typography>
      <Formik
        initialValues={{ otp: '' }}
        validationSchema={OTPSchema}
        onSubmit={async ({ otp }) => {
          setOtp(otp);
          user?.isFirstTime
            ? navigate('/login/update-password')
            : navigate('/login/reset-password');
        }}
      >
        {() => (
          <Form>
            <FormTextInput
              label={
                <>
                  An OTP has been sent to your mobile number
                  {''} <span style={{ fontWeight: 600 }}>98xxxxxx10</span> and Email Id
                  {''} <span style={{ fontWeight: 600 }}>nexxxxxxx@gxxxx.cxx </span>
                  {
                    //! For dev
                    <>
                      <br />
                      <span style={{ color: 'red' }}>
                        Please enter 123456 for testing
                      </span>
                    </>
                  }
                </>
              }
              name="otp"
              placeholder="Enter OTP"
            />

            <Typography
              sx={{
                fontSize: '14px',
                color: 'text.loginText',
                lineHeight: '21px',
                mb: 3.5,
                textAlign: 'end',
              }}
            >
              OTP is valid till 00:50{' '}
            </Typography>
            <SubmitButton label="Continue"></SubmitButton>
          </Form>
        )}
      </Formik>
      <Divider
        sx={{
          mt: 5,
          mb: '12px',
        }}
      />
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ mb: 5 }}>
        <Typography
          sx={{
            fontSize: '14px',
            color: 'text.loginText',
            lineHeight: '21px',
          }}
        >
          OTP not received?
        </Typography>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 700,
            color: 'text.resendOtp',
            lineHeight: '21px',
            ml: '12px',
            cursor: 'pointer',
          }}
        >
          Resend OTP
        </Typography>
      </Stack>
    </>
  );
}
