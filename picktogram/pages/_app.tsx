import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from "react-query"
import UserInfoContextProvider from "@/context/userInfoContext"


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
      <UserInfoContextProvider>
        <Component {...pageProps} />
      </UserInfoContextProvider>
    </QueryClientProvider>
  )

}
