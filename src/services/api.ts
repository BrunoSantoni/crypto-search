import axios from 'axios';

const apiKey =
  process.env.CRYPTO_COMPARE_API_KEY ||
  '44abc8e9c6bc87f53efe923f245087dfab5de2027389e481fb8d6200f72210f7';

export const api = axios.create({
  baseURL: 'https://min-api.cryptocompare.com',
  headers: {
    authorization: `Apikey ${apiKey}`,
  },
});
