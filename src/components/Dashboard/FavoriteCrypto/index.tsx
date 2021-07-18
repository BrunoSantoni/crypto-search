import { FavoriteCryptos } from 'types/FavoriteCryptos';
import { monetaryValue } from 'utils/monetaryValue';
import { percentageValue } from 'utils/percentageValue';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';

type FavoriteCryptoProps = FavoriteCryptos & {
  handleCryptoRemove: () => void;
};

export function FavoriteCrypto({
  name = '',
  image,
  price,
  variation,
  variationPercentage,
  handleCryptoRemove,
}: FavoriteCryptoProps) {
  const isVariationNegative = variation.toString().includes('-');

  return (
    <li
      key={price}
      className="bg-gray-100 w-auto flex gap-4 items-center justify-center rounded-md p-2 relative"
    >
      <button
        onClick={handleCryptoRemove}
        className="absolute right-4 top-4 text-red-700 transition-all transition-duration-200 hover:text-red-800"
      >
        <IoMdTrash size={20} />
      </button>
      <picture>
        <img
          width="100"
          height="100"
          src={image}
          alt="Imagem ilustrativa da moeda"
        />

        <p className="text-center mt-1">{name}</p>
      </picture>

      <article className="coin-info">
        <div>
          <strong className="block">Price</strong>
          <span className="text-green-500">{monetaryValue(price)}</span>
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
                isVariationNegative ? 'text-red-500' : 'text-green-500'
              }
            >
              {monetaryValue(variation)}

              <small className="ml-2">
                {percentageValue(variationPercentage)}
              </small>
            </span>
          </div>
        </div>
      </article>
    </li>
  );
}
