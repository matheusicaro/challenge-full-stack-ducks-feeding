import { action } from 'typesafe-actions';

import { AnimalFeedingDTO } from '../../../services/types';

import { Types, Payload } from './types';

/**
 * Actions change customer ip state in store
 *
 * loadRequest: request the type search the store
 * loadSuccess: feeds on the value for the animal feeding in the store
 * loadFailure: request action of failure to obtain the animal feeding store
 * loadFailure: request to insert new item created in animal feeding store
 */
export const loadRequest = () => action(Types.LOAD_REQUEST);
export const loadSuccess = (data: Payload) => action(Types.LOAD_SUCCESS, data);
export const loadFailure = () => action(Types.LOAD_FAILURE);
export const addNewItem = (dto: AnimalFeedingDTO) => action(Types.ADD_NEW_ITEM, dto);
