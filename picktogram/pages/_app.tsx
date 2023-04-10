import '@/styles/globals.css'
import 'remixicon/fonts/remixicon.css'

import Layout from '@/src/components/commons/layout'

import ReactGA from 'react-ga'

import { Toaster } from 'react-hot-toast';
import type { AppProps } from 'next/app'
import { QueryClientProvider, Hydrate } from "react-query"
import { getClient } from '@/util/queryClient'
import { RecoilRoot } from 'recoil';
import { ReactQueryDevtools } from 'react-query/devtools'
import { GA_ID } from '@/util/constant'

const queryClient = getClient()

export default function App({ Component, pageProps }: AppProps) {
  ReactGA.initialize(String(GA_ID))

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Hydrate state={pageProps.dehydratedState}>
            <Layout>
                <Component {...pageProps} />
                <Toaster />
            </Layout>
        </Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
  )
}
