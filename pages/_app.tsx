import { useEffect } from "react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { store } from "../store";
import { subscribe } from "../features/events/eventsSlice";

import Header from "../components/Header";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   store.dispatch(subscribe());
  // }, []);

  return (
    <ChakraProvider>
      <Provider store={store}>
        <QueryClientProvider client={client}>
          <Header />
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
