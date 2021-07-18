import { useEffect, useState } from 'react';
import { setCookie } from 'nookies';
import { api } from 'services/api';
import { monetaryValue } from 'utils/monetaryValue';
import { percentageValue } from 'utils/percentageValue';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';
import { useLoading } from 'hooks/useLoading';
import { showToastMessage } from 'utils/showToastMessage';
import Link from 'next/link';
import { getCookies } from 'utils/getCookies';

type FavoriteCryptosData = {
  name: string | undefined;
  price: number;
  variation: number;
  variationPercentage: number;
  image: string;
};

export function Dashboard() {
  const [favoriteCryptos, setFavoriteCryptos] = useState<FavoriteCryptosData[]>(
    [],
  );

  const { isLoading, startLoading, finishLoading } = useLoading();

  useEffect(() => {
    getApiData();
  }, []);

  async function getApiData() {
    startLoading();

    try {
      setFavoriteCryptos([]);

      const cryptosOnCookies = getCookies('crypto-search@cryptos');

      if (!cryptosOnCookies || cryptosOnCookies.length <= 0) {
        finishLoading();

        return;
      }

      const cryptosSymbols = cryptosOnCookies.map((crypto) => crypto.symbol);

      const { data } = await api.get(
        `data/pricemultifull?fsyms=${cryptosSymbols.join(',')}&tsyms=BRL`,
      );

      const allCryptos = data.RAW;

      if (!allCryptos) {
        finishLoading();

        return;
      }

      const responseKeys = Object.keys(allCryptos);
      const cryptoData = responseKeys.map((key) => {
        const cryptoName = cryptosOnCookies.find(
          (crypto) => crypto.symbol === key,
        );

        return {
          name: cryptoName?.name,
          price: allCryptos[key].BRL.PRICE,
          variation: allCryptos[key].BRL.CHANGEDAY,
          variationPercentage: allCryptos[key].BRL.CHANGEPCTDAY,
          image: allCryptos[key].BRL.IMAGEURL
            ? `https://www.cryptocompare.com/${allCryptos[key].BRL.IMAGEURL}`
            : '/img/no-img.jpg',
        };
      });

      setFavoriteCryptos(cryptoData);
    } catch (err) {
      showToastMessage({
        message: 'An Network error occurred, please try again',
        type: 'error',
      });
    } finally {
      finishLoading();
    }
  }

  function handleCryptoRemove(name?: string) {
    const cryptosOnCookies = getCookies('crypto-search@cryptos');

    if (!name || !cryptosOnCookies || cryptosOnCookies.length <= 0) return;

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

      {favoriteCryptos.length === 0 ? (
        <div className="text-blue-500 text-center text-lg">
          <span className="text-black">You are not tracking any crypto, </span>
          <Link href="/search-crypto">add some now</Link>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {favoriteCryptos.map((favoriteCrypto) => {
            const isVariationNegative = favoriteCrypto.variation
              .toString()
              .includes('-');

            return (
              <li
                key={favoriteCrypto.price}
                className="bg-gray-100 w-auto flex gap-4 items-center justify-center rounded-md p-2 relative"
              >
                <button
                  onClick={() => handleCryptoRemove(favoriteCrypto.name)}
                  className="absolute right-4 top-4 text-red-700 transition-all transition-duration-200 hover:text-red-800"
                >
                  <IoMdTrash size={20} />
                </button>
                <picture>
                  <img
                    width="100"
                    height="100"
                    src={favoriteCrypto.image}
                    alt="Imagem ilustrativa da moeda"
                  />

                  <p className="text-center mt-1">{favoriteCrypto.name}</p>
                </picture>

                <article className="coin-info">
                  <div>
                    <strong className="block">Price</strong>
                    <span className="text-green-500">
                      {monetaryValue(favoriteCrypto.price)}
                    </span>
                  </div>

                  <div className="mt-2">
                    <strong className="block">Last 24h</strong>

                    <div className="flex items-center">
                      {isVariationNegative ? (
                        <MdArrowDropDown className="text-red-500" />
                      ) : (
                        <MdArrowDropUp className="text-green-500" />
                      )}
                      <span
                        className={
                          isVariationNegative
                            ? 'text-red-500'
                            : 'text-green-500'
                        }
                      >
                        {monetaryValue(favoriteCrypto.variation)}

                        <small className="ml-2">
                          {percentageValue(favoriteCrypto.variationPercentage)}
                        </small>
                      </span>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
