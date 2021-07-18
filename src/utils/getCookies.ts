import { parseCookies } from 'nookies';
import { CryptoData } from 'types/Crypto';

export function getCookies(cookieKey: string): CryptoData[] | undefined {
  const cookies = parseCookies();

  if (cookies[cookieKey]) {
    return JSON.parse(cookies[cookieKey]);
  }
}
