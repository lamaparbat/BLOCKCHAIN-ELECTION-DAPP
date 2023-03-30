import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { Provider } from 'react-redux';
import { NextIntlProvider } from 'next-intl';
import { ToastContainer } from 'react-toastify';
import store from '../redux/store';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { getCookieValue } from '../services';

export default function App({ Component, pageProps }: AppProps) {
  const [langFiles, setLangFiles] = useState({});

  useEffect(() => {
    (async () => {
      const currentLanguage = getCookieValue(document.cookie, "lang");
      const langFiles = (await import(`../constants/locales/${currentLanguage ?? 'en'}.json`)).default;

      setLangFiles(langFiles);
    })();
  }, []);

  return (
    <Provider store={store}>
      <ToastContainer></ToastContainer>
      <NextIntlProvider messages={langFiles}>
        <Component {...pageProps} />
      </NextIntlProvider>
      <Analytics />
    </Provider>
  )
}

