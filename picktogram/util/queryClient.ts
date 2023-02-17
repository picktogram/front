import { MutationCache, QueryCache, QueryClient } from 'react-query';

export const getClient = () => {
    let client: QueryClient | null = null;

    if (!client) {
      return (client = new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 1000 * 60 * 60 * 24,
            staleTime: 1000 * 60,
            refetchOnMount: true,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
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
              console.log('success mutation!')
              // console.log(data)
            },
          })
      }));
    }

    return client;
  };

  export const QueryKeys = {
  };