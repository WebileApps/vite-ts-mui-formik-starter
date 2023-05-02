import { Box, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import SubmitButton from '../forms/FormSubmitButton';
import FormTextInput from '../forms/FormTextInput';
import { useLoginContext } from './data/login.context';

const PANSchema = Yup.object().shape({
  pan: Yup.string()
    .required('Enter your PAN as username')
    .matches(
      /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
      'Please enter a valid PAN number',
    ),
});

export default function ForgotPassword() {
  const { forgotPassword } = useLoginContext();
  const navigate = useNavigate();
  return (
    <>
      <Typography variant="h4" sx={{ pb: 1.5 }}>
        Forgot Password
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          letterSpacing: '0.01em',
          color: 'text.disabled',
          mb: 4.5,
        }}
      >
        Enter your username to change your password.
      </Typography>
      <Formik
        initialValues={{ pan: '' }}
        validationSchema={PANSchema}
        onSubmit={async ({ pan }) => {
          forgotPassword(pan).then(() => navigate('/login/verify-otp'));
        }}
      >
        {() => (
          <Form>
            <FormTextInput label={'Username'} name="pan" placeholder="Enter Username" />
            <Box sx={{ mt: 3, mb: [3, 3, 15] }}>
              <SubmitButton label="Confirm"></SubmitButton>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}
