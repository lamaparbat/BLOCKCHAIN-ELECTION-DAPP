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
import { getStorage, setStorage } from '../services';
import FullPageLoader from '../components/FullPageLoader';

export default function App({ Component, pageProps }: AppProps) {
  const [langFiles, setLangFiles] = useState(null);

  useEffect(() => {
    (async () => {
      let currentLanguage = getStorage("lang");

      if (!(currentLanguage === "en" || currentLanguage === "ne")) {
        currentLanguage = "en";
        setStorage("lang", currentLanguage)
      }

      const langFiles = (await import(`../constants/locales/${currentLanguage ?? 'en'}.json`)).default;

      setTimeout(() => {
        setLangFiles(langFiles);
      }, 1000)
    })();
  }, []);

  return (
    <Provider store={store}>
      {!langFiles ? <FullPageLoader /> :
        (
          <>
            <ToastContainer></ToastContainer>
            <NextIntlProvider messages={langFiles}>
              <Component {...pageProps} />
            </NextIntlProvider>
            <Analytics mode={'production'} />
          </>
        )
      }
    </Provider>
  )
}

