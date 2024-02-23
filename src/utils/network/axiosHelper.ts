import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import queryString from 'query-string';

const AxiosHelper = () => {
  let _baseUrl = '';
  let _authorization = '';
  let _instance: Axios;

  // 함수 체이닝 사용
  const setBaseUrl = (url: string) => {
    _baseUrl = url;
    return apiFunctions;
  };

  const setAuthorization = (token: string | null) => {
    _authorization = token ? token : '';
    return apiFunctions;
  };

  const build = () => {
    _instance = axios.create({
      baseURL: _baseUrl,
      withCredentials: true,
      headers: {
        common: {
          Authorization: `Bearer ${_authorization}`,
        },
      },
    });

    return apiFunctions;
  };

  const axiosError = async (error: AxiosError, params?: unknown) => {
    //에러 처리 로직에 맞게 기능 개발
    if (error?.response?.status == 401) {
      console.log(params);
    }
  };

  const get = async (url: string, params?: unknown): Promise<AxiosResponse> => {
    try {
      const { data } = await _instance.get(url, {
        params,
        paramsSerializer: (params) => {
          return queryString.stringify(params);
        },
      });

      return data;
    } catch (e) {
      throw axiosError(e as AxiosError, params);
    }
  };

  const post = async (url: string, params?: unknown): Promise<AxiosResponse> => {
    try {
      const { data } = await _instance.post(url, params);

      return data;
    } catch (e) {
      throw axiosError(e as AxiosError, params);
    }
  };

  const put = async (url: string, params?: unknown): Promise<AxiosResponse> => {
    try {
      const { data } = await _instance.put(url, params);

      return data;
    } catch (e) {
      throw axiosError(e as AxiosError, params);
    }
  };

  const del = async (url: string, params?: unknown): Promise<AxiosResponse> => {
    try {
      const { data } = await _instance.delete(url, {
        params,
        paramsSerializer: (params) => {
          return queryString.stringify(params);
        },
      });

      return data;
    } catch (e) {
      throw axiosError(e as AxiosError, params);
    }
  };

  const patch = async (url: string, params?: unknown): Promise<AxiosResponse> => {
    try {
      const { data } = await _instance.patch(url, params);

      return data;
    } catch (e) {
      throw axiosError(e as AxiosError, params);
    }
  };

  const apiFunctions = {
    setBaseUrl,
    setAuthorization,
    build,
    get,
    post,
    put,
    del,
    patch,
  };

  return apiFunctions;
};

export default AxiosHelper;
