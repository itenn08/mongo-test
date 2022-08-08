import Axios, {AxiosRequestConfig} from 'axios';
import AuthStore from '../store/Auth';

type APIPropsType = {
  url: string;
  method: any;
  config?: AxiosRequestConfig<any>;
  data?: any;
  params?: any;
};

export const axiosClient = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    source: 'WEB',
  },
});

export const API = async ({
  url,
  method,
  config,
  data,
  params,
}: APIPropsType): Promise<any> => {
  try {
    const response = await axiosClient
      .request({
        url,
        method,
        withCredentials: false,
        data,
        params,
        ...config,
      })
      .catch((error: any) => {
        throw error.response;
      });
    return {response};
  } catch (err: any) {
    return {err};
  }
};

axiosClient.interceptors.request.use(
  async (config) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${AuthStore.token}`,
    };
    if (!AuthStore.token) {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export const paramsSerializer = (parameters: {[key: string]: any}) => {
  const items = Object.keys(parameters).map((key) => {
    const value = parameters[key];
    if (Array.isArray(value)) {
      return value.map((v) => `${key}=${v}`);
    }
    return `${key}=${value}`;
  });

  return items.flat().join('&');
};
