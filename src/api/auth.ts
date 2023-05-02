import { _request } from './requests';

export async function getUserDetails(pan: string): Promise<any> {
  return _request({
    method: 'POST',
    relativeUrl: '/login/get-details',
    body: {
      PAN: pan,
    },
  });
}

export async function loginRequest(pan: string, password: string): Promise<any> {
  return _request({
    method: 'POST',
    relativeUrl: '/auth/login',
    body: {
      pan,
      password,
    },
  });
}

export async function verifyOtpRequest(otp: string, code: string): Promise<any> {
  return _request({
    method: 'POST',
    relativeUrl: '/login/verify-login-code',
    body: { otp, code },
  });
}

export async function resetPasswordRequest(
  otp: string,
  password: string,
  sessionId: string = '',
): Promise<any> {
  return _request({
    method: 'POST',
    relativeUrl: '/auth/resetPassword',
    body: { otp: otp, password, sessionId },
  });
}

export function forgotPasswordRequest(pan: string) {
  return _request({
    method: 'POST',
    relativeUrl: '/auth/forgotPassword',
    body: { pan },
  });
}
