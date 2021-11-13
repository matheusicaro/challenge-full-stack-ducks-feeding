import axios, { AxiosRequestConfig } from 'axios';

import environments from '../environments';

import AuthService from './auth';
import { AnimalFeedingDTO, AuthToken, NewAnimalFeeding, ResponseApi } from './types';

/**
 * Class for integration with application backend
 *
 */
const API = axios.create({
  baseURL: environments.baseURL,
});

const getConfig = (headers = {}): AxiosRequestConfig => {
  return {
    headers: {
      'x-api-token': AuthService.getToken(),
      Accept: 'application/json',
      ...headers,
    },
  };
};

/**
 * Function to delay the parse of the request return to give a better user experience between loading actions.
 *
 * @param  {number} start: hora de início do pedido
 * @param  {()=>void} callback: callback function to be called after delay
 */
const delay = (start: number, callback: () => void) => {
  const DELAY_SECONDS = 1500;
  const applyDelay = Date.now() - start < DELAY_SECONDS;

  if (applyDelay) setTimeout(() => callback(), DELAY_SECONDS);
  else callback();
};

/**
 * Function for get request method with delay function in the parse of the return of requests
 *
 * @param  {string} path: path to request
 * @param  {AxiosRequestConfig} config?: configs to request such as header, params, etc...
 *
 * @returns Response: returns the requested response with date of type T which must be absent in case of error
 */
const get = async <T>(path: string, config?: AxiosRequestConfig): Promise<ResponseApi<T>> => {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    API.get(path, config)
      .then((res) => delay(start, () => resolve({ status: res.status, data: res.data })))
      .catch((error) => delay(start, () => reject({ status: error?.response?.status, message: error?.response?.data?.message })));
  });
};

/**
 * Function for post request method with delay function in the parse of the return of requests
 *
 * @param  {string} path: path to request
 * @param  {any} data?: body to request
 * @param  {AxiosRequestConfig} config?: configs to request such as header, params, etc...
 *
 * @returns Response: returns the requested response with date of type T which must be absent in case of error
 */
const post = async <T>(path: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseApi<T>> => {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    API.post(path, data, config)
      .then((res) => delay(start, () => resolve({ status: res.status, data: res.data })))
      .catch((error) => delay(start, () => reject({ status: error?.response?.status, message: error?.response?.data?.message })));
  });
};

/**
 * Public method export to requests
 *
 * @getGeolocationIP - function to get ip geolocation on back end
 *
 */
const ApiService = {
  getAnimalFeeding: (animal: string): Promise<ResponseApi<Array<AnimalFeedingDTO>>> => {
    return get<Array<AnimalFeedingDTO>>('/animals/feeding', getConfig({ animal }));
  },

  saveAnimalFeeding: (newAnimalFeeding: NewAnimalFeeding, animal: string): Promise<ResponseApi<AnimalFeedingDTO>> => {
    return post<AnimalFeedingDTO>('/animals/feeding', newAnimalFeeding, getConfig({ animal }));
  },

  login: (email: string, password: string): Promise<ResponseApi<AuthToken>> => {
    return post<AuthToken>('/user/login', { email, password }, getConfig({}));
  },

  singup: (name: string, email: string, password: string): Promise<ResponseApi<void>> => {
    return post<void>('/user/singup', { name, email, password }, getConfig({}));
  },
};

export default ApiService;
