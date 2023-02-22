import { MutationCache, QueryCache, QueryClient } from 'react-query';

 export const getClient = (() => {
    let client : QueryClient | null = null;

    return () => {
      if(!client) client = new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 1000 * 60 * 60 * 24,
            staleTime: 1000 * 60,
            // staleTime : 0 ,
            refetchOnMount: true,
            refetchOnReconnect: false,
            refetchOnWindowFocus: true,
          },
        },
        queryCache: new QueryCache({
            onError: (error, query) => {
              console.log('Error', error);
            },
            onSuccess: (data) => {
              console.log('Success', data);
            }
          }),
          mutationCache : new MutationCache({
            onError: error => {
              console.log('Error', error);
            },
            onSuccess: data => {
              console.log('Success mutation', data);
              // client?.invalidateQueries({queryKey : ['infiniteBoard']})
            },
          })
      })

      return client
    }
  })();

  export const QueryKeys = {
  };