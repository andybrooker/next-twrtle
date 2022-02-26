import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../styles/theme';
import createEmotionCache from '../styles/createStyleCache';
import { SessionProvider } from 'next-auth/react';
import { AuthGuard } from '../components/AuthGuard';
import Layout from '../components/layout';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

export default function MyApp(props) {

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>)

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Twrtle</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <SessionProvider session={pageProps.session}>

          <ThemeProvider theme={theme}>
            <CssBaseline />
            {Component.auth ? (
              <AuthGuard>
                {getLayout(<Component {...pageProps} />)}
              </AuthGuard>
            ) : (
              <Component {...pageProps} />
            )}
          </ThemeProvider>
        </SessionProvider>
      </CacheProvider>
      <ReactQueryDevtools initialIsOpen={true}/>
    </QueryClientProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

