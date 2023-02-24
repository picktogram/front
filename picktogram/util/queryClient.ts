import { MutationCache, QueryCache, QueryClient } from 'react-query';
import { SERVER_URL } from "@/util/constant"
import axios from "axios"

type AnyOBJ = { [key: string]: any };

export const fetcher = async ({
  method,
  path,
  data,
  headers,
} : {
  method: 'get' | 'post' | 'delete' | 'patch';
  path : string;
  data? : AnyOBJ;
  headers? : AnyOBJ;
}) => {
  try {
    const responce = await axios({
      method : method,
      url : `${SERVER_URL}${path}`,
      data : JSON.stringify(data),
      headers : headers,
    });

    const result = await responce.data.data
    return result
  } catch (error) {
      throw error
  }
}

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
      })

      return client
    }
  })();

  export const QueryKeys = {
  };