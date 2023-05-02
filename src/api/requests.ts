import AES from './aes';
import AuthError from './auth-error';

export const BASE_URL = `${import.meta.env.VITE_API_BASE_URL || ''}/api`;

function debugLog(...args: any[]) {
  if (import.meta.env.MODE !== 'prod') {
    console.log(...args);
  }
}

type GetProps = {
  method: 'GET' | 'POST';
  relativeUrl: string;
  additionalHeaders?: Record<string, string>;
  sendSessionID_last_call?: boolean;
  sendSessionID_login?: boolean;
  sendSessionID_decrypt?: boolean;
  sendUUID?: boolean;
  sendUserId?: boolean;
  useRelativeUrl?: boolean;
  fixtureEnabled?: boolean;
  useEncryption?: boolean;
  json?: string;

  body?: Record<string, any>;
};
type PostProps = GetProps & {
  body: Record<string, any>;
};

const DEFAULT_HEADERS = {
  'Content-Type': 'text/plain',
  Accept: 'application/json',
};

export async function _request<T>({
  method,
  relativeUrl,
  additionalHeaders = {},
  body,
  useRelativeUrl = true,
  useEncryption = false,
}: GetProps | PostProps): Promise<T> {
  const reqBody = { ...body };

  const payload = useEncryption
    ? new AES().encrypt(JSON.stringify(reqBody || {}))
    : JSON.stringify(reqBody || {});
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 90000);

  const token = window.sessionStorage.getItem('token');
  const headers = {
    ...DEFAULT_HEADERS,
    ...additionalHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(useEncryption ? {} : { 'Content-Type': 'application/json' }),
  };

  const response = await fetch(
    useRelativeUrl ? `${BASE_URL}${relativeUrl}` : relativeUrl,
    {
      method,
      headers,
      credentials: 'same-origin',
      signal: controller.signal,
      ...(method === 'GET' ? {} : { body: payload }),
    },
  );
  const responseBody =
    response.headers.get('content-type') === 'application/json; charset=utf-8' ||
    response.headers.get('content-type') === 'application/json'
      ? await response.json()
      : response.headers.get('content-type') === 'application/pdf'
      ? await response.blob()
      : await response.text();

  if (response.status === 401) {
    // store.dispatch({ type: 'LOGOUT_SUCCESS' });
    sessionStorage.clear();
    throw new AuthError(responseBody.message);
  }
  if (response.status >= 500) {
    throw new Error(responseBody.message);
  }
  if (response.status >= 400) {
    throw new Error(responseBody.message);
  }
  if (useEncryption) {
    const decryptedBody = new AES().decrypt(responseBody);
    const parsedBody = JSON.parse(decryptedBody as string);
    debugLog(`Parsed response from ${relativeUrl}`, parsedBody);
    debugLog(`***********************************************`);
    return parsedBody;
  }
  return responseBody;
}
