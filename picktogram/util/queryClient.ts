import { QueryClient } from 'react-query';
import { SERVER_URL } from "@/util/constant"
import axios from "axios"

type AnyOBJ = { [key: string]: any };

type AddKey<T, U extends string> = {
  [key in U] : any
} & T

type FetcherFn = ({
  method,
  path,
  data,
  headers,
} : {
  method: 'get' | 'post' | 'delete' | 'patch';
  path : string;
  data? : AnyOBJ;
  headers? : AnyOBJ;
}) => Promise<any>

type InfiniteFetcherFn<T extends FetcherFn , U extends string> = T extends (arg : infer C) => any
  ? (arg : AddKey<C, U>) => Promise<any>
  : never;

export const fetcher : FetcherFn = async ({
  method,
  path,
  data,
  headers,
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

export const infiniteFetcher : InfiniteFetcherFn<FetcherFn, 'page'> = async ({
  method,
  path,
  data,
  headers,
  page
}) => {
  try {
    const responce = await axios({
      method : method,
      url : `${SERVER_URL}${path}${page}`,
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
            cacheTime: 1000 * 60 * 5,
            staleTime: 1000 * 60,
            refetchOnMount: false,
            refetchOnReconnect: true,
            refetchOnWindowFocus: true,
            retry : 0,
            suspense : true,
          },
        },
      })

      return client
    }
  })();

export const QueryKeys = {
};