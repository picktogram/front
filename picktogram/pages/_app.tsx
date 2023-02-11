import Layout from '@/components/layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider, QueryCache, MutationCache, Hydrate } from "react-query"
import UserInfoContextProvider from "@/src/context/userInfoContext"
import 'remixicon/fonts/remixicon.css'
import { getClient } from '@/util/queryClient'

const queryClient = getClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <UserInfoContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserInfoContextProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
