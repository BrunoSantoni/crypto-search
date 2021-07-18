import 'styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { AppProvider } from 'hooks';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Head>
        <title>Crypto Search</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta
          name="description"
          content="Track and compare all cryptocoins currency"
        />
      </Head>
      <ToastContainer />
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
