import axios, {AxiosError} from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, RawAxiosRequestHeaders} from "axios";
import { SERVER_URL } from "./constant";

const requstConfig : AxiosRequestConfig  = {
    baseURL : SERVER_URL
}

class HttpRequest {
    api : AxiosInstance;

    constructor() {
        this.api = axios.create(requstConfig);

        this.api.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                return config;
            },
            (error: AxiosError) => {
                console.log(error);
                return Promise.reject(error);
            }
        );

        this.api.interceptors.response.use(
            (res: AxiosResponse) => {
                return res;
            },
            (error: AxiosError) => {
                console.log(error);
                return Promise.reject(error);
            }
        );
    }

    async use({
        method,
        url,
        data,
        headers
    } : {
        method : 'get' | 'post' | 'delete' | 'patch',
        url : string;
        data? : any;
        headers? : RawAxiosRequestHeaders;
    }) {

        return this.api({method, url, data, headers});
    }
}

const Axios = new HttpRequest();

export default Axios;