import { useEffect, useState } from 'react';
import { setCookie } from 'nookies';
import { api } from 'services/api';
import { useLoading } from 'hooks/useLoading';
import { showToastMessage } from 'utils/showToastMessage';
import Link from 'next/link';
import { getCookies } from 'utils/getCookies';
import { FavoriteCryptos } from 'types/FavoriteCryptos';
import { FavoriteCrypto } from './FavoriteCrypto';

export function Dashboard() {
  const [favoriteCryptos, setFavoriteCryptos] = useState<FavoriteCryptos[]>([]);

  const { isLoading, startLoading, finishLoading } = useLoading();

  useEffect(() => {
    getApiData();
  }, []);

  async function getApiData() {
    startLoading();

    try {
      setFavoriteCryptos([]);

      const cryptosOnCookies = getCookies('crypto-search@cryptos');

      if (!cryptosOnCookies || !cryptosOnCookies.length) {
        return;
      }

      // Pegando os simbolos (ex: BTC, 42) que o usuário salvou nos cookies para usar como query param na requisição
      const cryptosSymbols = cryptosOnCookies.map((crypto) => crypto.symbol);

      const { data } = await api.get(
        `data/pricemultifull?fsyms=${cryptosSymbols.join(',')}&tsyms=BRL`,
      );

      const allCryptos = data.RAW;

      if (!allCryptos) {
        return;
      }

      // Como a resposta da API não é um array, criei um array com a key de cada objeto para poder percorrer e manipular
      const responseKeys = Object.keys(allCryptos);
      const cryptoData = responseKeys.map((key) => {
        const crypto = allCryptos[key];

        // A chamada feita nesse arquivo não retorna o nome da moeda, para isso pegamos o nome dela nos cookies
        const cryptoName = cryptosOnCookies.find(
          (crypto) => crypto.symbol === key,
        );

        return {
          name: cryptoName?.name,
          price: crypto.BRL.PRICE,
          variation: crypto.BRL.CHANGE24HOUR,
          variationPercentage: crypto.BRL.CHANGEPCT24HOUR,
          image: crypto.BRL.IMAGEURL
            ? `https://www.cryptocompare.com/${crypto.BRL.IMAGEURL}`
            : '/img/no-img.jpg',
        };
      });

      setFavoriteCryptos(cryptoData);
    } catch {
      showToastMessage({
        message: 'An Network error occurred, please try again',
        type: 'error',
      });
    } finally {
      finishLoading();
    }
  }

  function handleCryptoRemove(name: string) {
    const cryptosOnCookies = getCookies('crypto-search@cryptos');

    if (!name || !cryptosOnCookies || !cryptosOnCookies.length) return;

    const filteredCryptos = cryptosOnCookies.filter(
      (crypto) => crypto.name !== name,
    );

    setCookie(
      undefined,
      'crypto-search@cryptos',
      JSON.stringify(filteredCryptos),
      {
        path: '/',
      },
    );

    showToastMessage({
      type: 'success',
      message: 'Crypto removed from track',
    });

    // Chamo a função para atualizar os dados em tempo real na dashboard
    getApiData();
  }

  if (isLoading) {
    return (
      <section className="flex-1 p-4 flex justify-center items-center flex-col">
        <div className="loader ease-linear rounded-full border-4 h-12 w-12"></div>
        <p className="mt-4">Loading...</p>
      </section>
    );
  }

  return (
    <section className="flex-1 p-4">
      <h2 className="text-center text-2xl mb-2">Tracked Cryptocurrencies</h2>

      {favoriteCryptos.length === 0 && (
        <div className="text-blue-500 text-center text-lg">
          <span className="text-black">You are not tracking any crypto, </span>
          <Link href="/search-crypto">add some now</Link>
        </div>
      )}

      {favoriteCryptos.length > 0 && (
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {favoriteCryptos.map(
            ({ name, image, price, variation, variationPercentage }) => (
              <FavoriteCrypto
                key={name}
                name={name}
                image={image}
                price={price}
                variation={variation}
                variationPercentage={variationPercentage}
                handleCryptoRemove={() => handleCryptoRemove(name ? name : '')}
              />
            ),
          )}
        </ul>
      )}
    </section>
  );
}
