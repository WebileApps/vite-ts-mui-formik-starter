import { Route, Routes } from 'react-router';

import ForgotPassword from './forgot-password';
import LoginLayout from './layout';
import Login from './login.component';
import OtpScreen from './otp-screen';
import UpdatePassword from './update-password';

function LoginRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="" element={<LoginLayout />}>
        <Route path="update-password" element={<UpdatePassword />} />
        <Route path="verify-otp" element={<OtpScreen />} />
        <Route path="reset-password" element={<UpdatePassword />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
}

export default LoginRouter;
