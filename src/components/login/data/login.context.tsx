import { createContext, ReactElement, useContext, useState } from 'react';

import {
  forgotPasswordRequest,
  loginRequest,
  resetPasswordRequest,
} from '../../../api/auth';
import { useRootContext } from '../../data/root.context';

const LoginContext = createContext<{
  sessionId?: string;
  // eslint-disable-next-line no-unused-vars
  verifyLogin(pan: string, password: string): Promise<any>;
  // eslint-disable-next-line no-unused-vars
  resetPassword(password: string): Promise<any>;
  // eslint-disable-next-line no-unused-vars
  forgotPassword(password: string): Promise<any>;
  logout(): void;
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
}>({
  verifyLogin: () => new Promise(() => {}),
  resetPassword: () => new Promise(() => {}),
  forgotPassword: () => new Promise(() => {}),
  logout: () => {},
  otp: '',
  setOtp: () => {},
});

export function useLoginContext() {
  return useContext(LoginContext);
}

const SESSION_KEY_TOKEN = 'token';
const SESSION_KEY_USER_DETAILS = 'userDetails';

export function LoginContextProvider({ children }: { children: ReactElement }) {
  const [otp, setOtp] = useState('');
  const [sessionId, setSessionId] = useState<string | undefined>();
  const { showToast } = useRootContext();

  const verifyLogin = (username: string, password: string) => {
    return loginRequest(username, password)
      .then((response) => {
        const { userDetails } = response;
        // eslint-disable-next-line no-unused-vars
        const { token, purpose, authenticated, ...rest } = userDetails;
        setSessionId(userDetails?.sessionId);
        if (token) {
          sessionStorage.setItem(SESSION_KEY_TOKEN, token);
          sessionStorage.setItem(SESSION_KEY_USER_DETAILS, JSON.stringify(rest));
        }
        return response;
      })
      .catch((e) => {
        showToast('Invalid username and password', 'error');
        throw new Error('Invalid', e);
      });
  };

  const resetPassword = (password: string) => {
    return resetPasswordRequest(otp, password, sessionId)
      .then((res) => {
        showToast('Password Reset successful', 'success');
        return res;
      })
      .catch((e) => {
        showToast(e?.message || 'Something went wrong, please try again', 'error');
        throw new Error('Something went wrong', e);
      });
  };

  const forgotPassword = (pan: string) => {
    return forgotPasswordRequest(pan)
      .then((res) => {
        const { details }: any = res;
        setSessionId(details?.sessionId);
        return res;
      })
      .catch((e) => {
        showToast('User not found.', 'error');
        throw new Error('User not found', e);
      });
  };

  const logout = () => {
    setSessionId(undefined);
    sessionStorage.clear();
  };

  return (
    <LoginContext.Provider
      value={{
        verifyLogin,
        resetPassword,
        forgotPassword,
        logout,
        sessionId,
        otp,
        setOtp,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
