import Layout from '@/components/layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider, QueryCache, MutationCache, Hydrate } from "react-query"
import UserInfoContextProvider from "@/src/context/userInfoContext"
import 'remixicon/fonts/remixicon.css'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.log('onError', error);
    },
    onSuccess: (data) => {
      console.log('onSuccess', data);
    }
  }),
  mutationCache : new MutationCache({
    onError: error => {
      console.log(error)
    },
    onSuccess: data => {
      console.log('sucess mutation!')
      console.log(data)
    },
  })
})

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
