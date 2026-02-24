import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { CookiesProvider } from "react-cookie"
import { Provider } from "react-redux"
import { store } from "../../app/store"
import { NextPage } from "next"
import { ReactElement, ReactNode } from "react"

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};


export default function App({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <CookiesProvider>
        {getLayout(<Component {...pageProps} />)}
      </CookiesProvider>
    </Provider>
  )
}