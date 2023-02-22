import Layout from '@/src/components/commons/layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider, QueryCache, MutationCache, Hydrate } from "react-query"
import 'remixicon/fonts/remixicon.css'
import { getClient } from '@/util/queryClient'
import { RecoilRoot } from 'recoil';
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = getClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <Layout>
              <Component {...pageProps} />
            </Layout>
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  )
}
