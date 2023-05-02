import { Box, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import SubmitButton from '../forms/FormSubmitButton';
import { FormPasswordInput } from '../forms/FormTextInput';
import { useLoginContext } from './data/login.context';

const validationSchema = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Password should contain minimum 8 characters with atleast one uppercase, one lowercase, a number and a special character.',
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
});

export default function UpdatePassword() {
  const { resetPassword, sessionId, logout } = useLoginContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    !sessionId && navigate('/login');
  }, [sessionId]);

  return (
    <>
      <Typography variant="h4" sx={{ pb: 1.5 }}>
        {location.pathname.includes('reset')
          ? 'Reset your password'
          : 'Create new password'}
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          letterSpacing: '0.01em',
          color: 'text.disabled',
          mb: 4.5,
        }}
      >
        Please enter your new 8-digit alphanumeric password
      </Typography>
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={async ({ password, confirmPassword }) => {
          password === confirmPassword && resetPassword(password).then(() => logout());
        }}
      >
        {() => (
          <Form>
            <FormPasswordInput
              label={'New Password'}
              name="password"
              placeholder="Enter New Password"
            />
            <FormPasswordInput
              label={'Confirm New Password'}
              name="confirmPassword"
              placeholder="Enter New Password"
            />
            <Box sx={{ mt: 3 }}>
              <SubmitButton label="Confirm"></SubmitButton>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}
