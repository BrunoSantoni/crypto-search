import 'styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { AppProvider } from 'hooks';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
