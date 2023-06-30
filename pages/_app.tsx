import 'styles/globals.css';

import { ApolloProvider } from '@apollo/client';
import client from 'apollo-client';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store, wrapper } from 'redux/reduxStore';
import Toast from 'src/app/components/Toast';
// import { useEffect, useState } from 'react';
// import { setJwtTokenAction, setUserInfoAction } from 'redux/actions/actions';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import { listenToPairUpdates } from 'utility/binance-coin-trading/pairsManager';
// import { fetchUserInfo } from 'graphql/queries/fetchUserInfo';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Toast />
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
}

MyApp.getInitialProps = async () => {
  // if (typeof window === "undefined" && !memoryCache.get('python-engine')) {
  // //   const signature = Math.random();
  // //   memoryCache.set('tickersWSstarted', signature);

  // //   console.log('Start listen to tickers data websocket stream: ', signature);

  //   startPythonEngine();
  // }

  return { props: {} };
};

export default wrapper.withRedux(MyApp);
