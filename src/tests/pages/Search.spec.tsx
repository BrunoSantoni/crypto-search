import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { AppProvider } from '../../hooks';
import SearchCrypto from '../../pages/search-crypto';

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
  // it('Renders Loading', async () => {
  //   const { container } = render(
  //     <AppProvider>
  //       <SearchCrypto />
  //     </AppProvider>,
  //   );
  //   const loader = container.querySelector('.loader');
  //   await waitFor(() => expect(loader).toBeInTheDocument());
  // });

  // it('Finish loading', async () => {
  //   const { container } = render(
  //     <AppProvider>
  //       <SearchCrypto />
  //     </AppProvider>,
  //   );

  //   const loader = container.querySelector('.loader');
  //   await waitFor(() => expect(loader).not.toBeInTheDocument());
  // });

  it('Fetches Mocked API data, do the search and the coin appears on the screen', async () => {
    const { container } = render(
      <AppProvider>
        <SearchCrypto />
      </AppProvider>,
    );

    const loader = container.querySelector('.loader');

    await waitForElementToBeRemoved(loader);

    const { getByPlaceholderText, findByText } = screen;

    const searchField = getByPlaceholderText('Enter your search...');

    fireEvent.change(searchField, { target: { value: '42' } });

    await findByText('42 Coin (42)');
  });
});
