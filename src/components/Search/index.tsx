import { ChangeEvent, useState } from 'react';
import { CryptoData } from 'types/Crypto';

import { setCookie } from 'nookies';
import { useLoading } from 'hooks/useLoading';
import { useEffect } from 'react';
import { api } from 'services/api';
import { showToastMessage } from 'utils/showToastMessage';
import { getCookies } from 'utils/getCookies';

export function Search() {
  const [filteredCryptos, setFilteredCryptos] = useState<CryptoData[]>([]);
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const { isLoading, startLoading, finishLoading } = useLoading();

  useEffect(() => {
    async function getData() {
      startLoading();

      try {
        const { data } = await api.get('/data/all/coinlist?summary=true');

        const responseData = data.Data;

        const responseKeys = Object.keys(responseData);

        const cryptoData = responseKeys.map((key) => {
          return {
            id: responseData[key].Id,
            name: responseData[key].FullName,
            symbol: responseData[key].Symbol,
            image: responseData[key].ImageUrl
              ? `https://www.cryptocompare.com/${responseData[key].ImageUrl}`
              : '/img/no-img.jpg',
          };
        });
        setCryptos(cryptoData);
        setFilteredCryptos(cryptoData.slice(0, 12));
      } catch (err) {
        showToastMessage({
          message: 'An Network error occurred, please try again',
          type: 'error',
        });
      } finally {
        finishLoading();
      }
    }

    getData();
  }, []);

  function handleCryptoSearch(e: ChangeEvent<HTMLInputElement>) {
    const keyword = e.target.value.toLowerCase().trim();

    if (!keyword) {
      setFilteredCryptos(cryptos.slice(0, 12));

      return;
    }

    const filtered = cryptos.filter((crypto) =>
      crypto.name.toLowerCase().includes(keyword),
    );

    setFilteredCryptos(filtered.slice(0, 12));
  }

  function handleAddCrypto(filteredCrypto: CryptoData) {
    let newCryptoInfo = [];

    const cryptosOnCookies = getCookies('crypto-search@cryptos');

    if (!cryptosOnCookies || cryptosOnCookies.length <= 0) {
      newCryptoInfo = [filteredCrypto];

      showToastMessage({
        type: 'success',
        message: 'Crypto added to tracking',
      });
    } else {
      const alreadySaved = cryptosOnCookies.find(
        (crypto) => crypto.id === filteredCrypto.id,
      );

      if (alreadySaved) {
        showToastMessage({
          type: 'error',
          message: 'Crypto is already being tracked by you',
        });

        return;
      }
      newCryptoInfo = [...cryptosOnCookies, filteredCrypto];

      showToastMessage({
        type: 'success',
        message: 'Crypto added to tracking',
      });
    }

    setCookie(
      undefined,
      'crypto-search@cryptos',
      JSON.stringify(newCryptoInfo),
      {
        path: '/',
      },
    );
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
      <h2 className="text-center text-2xl">Add Cryptocurrencies to track</h2>

      <input
        type="text"
        placeholder="Enter your search..."
        onChange={(e) => handleCryptoSearch(e)}
        id="search"
        className="block w-full max-w-lg p-2 text-center m-auto border-2 border-gray-200 rounded-md mt-4"
      />

      <ul className="grid gap-16 grid-cols-2 mt-8 items-center justify-items-center md:grid-cols-3 lg:grid-cols-4">
        {filteredCryptos.length > 0 ? (
          filteredCryptos.map((filteredCrypto) => (
            <li
              key={filteredCrypto.id}
              className="bg-transparent transition-bg duration-200 hover:bg-gray-100 p-4 rounded-md w-full text-center"
            >
              <button
                className="w-full"
                onClick={() => handleAddCrypto(filteredCrypto)}
              >
                <img
                  width="60"
                  height="60"
                  className="m-auto mb-2"
                  src={filteredCrypto.image}
                  alt={filteredCrypto.name}
                />
                <span>{filteredCrypto.name}</span>
              </button>
            </li>
          ))
        ) : (
          <li className="col-span-2 md:col-span-3 lg:col-span-4">
            <p className="text-center text-lg">No crypto found... =(</p>
          </li>
        )}
      </ul>
    </section>
  );
}
