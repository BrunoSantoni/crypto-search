import { CryptoData } from 'types/Crypto';

type CryptoListProps = CryptoData & {
  handleAddCrypto: () => void;
};

export function CryptoList({
  id,
  image,
  name,
  handleAddCrypto,
}: CryptoListProps) {
  return (
    <li
      key={id}
      className="bg-transparent transition-bg duration-200 hover:bg-gray-100 p-4 rounded-md w-full text-center"
    >
      <button className="w-full" onClick={handleAddCrypto}>
        <img
          width="60"
          height="60"
          className="m-auto mb-2"
          src={image}
          alt={name}
        />
        <span>{name}</span>
      </button>
    </li>
  );
}
