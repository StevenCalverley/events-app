import { useEffect } from "react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";

import { store } from "../store";
import { subscribe } from "../features/events/eventsSlice";

import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    store.dispatch(subscribe());
  }, []);

  return (
    <ChakraProvider>
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
