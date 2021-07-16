import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://min-api.cryptocompare.com',
  headers: {
    authorization: `Apikey ${process.env.CRYPTO_COMPARE_API_KEY}`,
  },
});
