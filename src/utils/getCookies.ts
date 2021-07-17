import { parseCookies } from 'nookies';
import { CryptoData } from 'types/Crypto';

export function getCookies(cookieKey: string): CryptoData[] | null {
  const cookies = parseCookies();

  if (!cookies[cookieKey]) {
    return null;
  }

  return JSON.parse(cookies[cookieKey]);
}
