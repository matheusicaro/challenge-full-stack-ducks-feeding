import axios, { AxiosRequestConfig } from 'axios';

import environments from '../environments';

import { AnimalFeedingDTO, ResponseApi } from './types';

/**
 * Class for integration with application backend
 *
 */
const API = axios.create({
  baseURL: environments.baseURL,
});

const getConfig = (headers = {}) => {
  return {
    headers: {
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
 * Function for post request method with delay function in the parse of the return of requests
 *
 * @param  {string} path: path to request
 * @param  {any} data?: body to request
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
 * Public method export to requests
 *
 * @getGeolocationIP - function to get ip geolocation on back end
 *
 */
export default {
  getAnimalFeeding: (animal: string) => get<AnimalFeedingDTO>('/animals/feeding', getConfig({ animal })),
};
