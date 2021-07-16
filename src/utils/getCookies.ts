import { parseCookies } from 'nookies';

export function getCookies(cookieKey: string) {
  const cookies = parseCookies();

  if (!cookies[cookieKey]) {
    return null;
  }

  return JSON.parse(cookies[cookieKey]);
}
