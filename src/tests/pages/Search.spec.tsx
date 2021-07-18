import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { AppProvider } from '../../hooks';
import SearchCrypto from '../../pages/search-crypto';

// Forçando um retorno fake do Next Router
jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/search-crypto',
      };
    },
  };
});

describe('Search page', () => {
  it('should fetch Mocked API data, do the search and show the coins on screen', async () => {
    const { container } = render(
      <AppProvider>
        <SearchCrypto />
      </AppProvider>,
    );

    const loader = container.querySelector('.loader');
    await waitForElementToBeRemoved(loader);

    const searchField = screen.getByPlaceholderText('Enter your search...');

    fireEvent.change(searchField, { target: { value: '42' } });

    expect(await screen.findByText('42 Coin (42)')).toBeInTheDocument();
  });
});
