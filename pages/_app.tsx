import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider, gql } from "@apollo/client";
import client, { makeGraphqlQuery } from "apollo-client";

import { wrapper, store } from "redux/reduxStore";
import { Provider } from "react-redux";
import Toast from 'src/app/components/Toast';
import memoryCache from 'utility/mem-cache/mem-cache';
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

MyApp.getInitialProps = async (context: any) => {
  // if (typeof window === "undefined" && !memoryCache.get('python-engine')) {
  // //   const signature = Math.random();
  // //   memoryCache.set('tickersWSstarted', signature);

  // //   console.log('Start listen to tickers data websocket stream: ', signature);

  //   startPythonEngine();
  // }

  return { props: {} };
};

export default wrapper.withRedux(MyApp);
