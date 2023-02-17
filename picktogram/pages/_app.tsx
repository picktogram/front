import Layout from '@/src/components/commons/layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider, QueryCache, MutationCache, Hydrate } from "react-query"
import 'remixicon/fonts/remixicon.css'
import { getClient } from '@/util/queryClient'

const queryClient = getClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </Hydrate>
    </QueryClientProvider>
  )
}
