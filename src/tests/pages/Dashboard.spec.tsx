import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { AppProvider } from '../../hooks';
import Dashboard from '../../pages';
import * as cookiesHelper from 'utils/getCookies';

// Forçando um retorno fake do Next Router
jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/',
      };
    },
  };
});

// Forçando um retorno fake dos cookies
jest.spyOn(cookiesHelper, 'getCookies').mockReturnValueOnce([
  {
    id: '4321',
    name: '42 Coin (42)',
    symbol: '42',
    image: 'https://www.cryptocompare.com//media/35650717/42.jpg',
  },
]);

describe('Dashboard page', () => {
  it('should fetch Mocked API data and show the coins tracked', async () => {
    const { container } = render(
      <AppProvider>
        <Dashboard />
      </AppProvider>,
    );

    const loader = container.querySelector('.loader');
    await waitForElementToBeRemoved(loader);

    expect(await screen.findByText('42 Coin (42)')).toBeInTheDocument();
  });
});
