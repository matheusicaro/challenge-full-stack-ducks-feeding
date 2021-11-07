import { put } from 'redux-saga/effects';

import apiService from '../../../services/api.service';
import { AnimalFeedingDTO, ResponseApi } from '../../../services/types';

import { loadFailure, loadSuccess } from './actions';
import { AnimalFeeding } from './types';

/**
 * Function to get external data and return action to the store
 *
 *  @return  {Action} store action
 */
export function* loadAnimalFeedingData() {
  try {
    const response = yield apiService.getAnimalFeeding('DUCK');

    if (!response || response.status !== 200) throw Error('Error when requesting external data');

    const animalFeedingDTOs = (response as ResponseApi<Array<AnimalFeedingDTO>>).data;

    const payload = buildAnimalFeedingFromDTO(animalFeedingDTOs);

    yield put(loadSuccess(payload));
  } catch (err) {
    yield put(loadFailure());
  }
}

const buildAnimalFeedingFromDTO = (animalFeedingDTOs: Array<AnimalFeedingDTO>): Array<AnimalFeeding> => {
  const buildAnimalFeeding = (dto: AnimalFeedingDTO): AnimalFeeding => ({
    id: dto.id,
    animal: dto.animal,
    createdAt: new Date(dto.created_at),
    feeding: {
      ...dto.feeding,
      quantityKilos: dto.feeding.quantity_kilos,
    },
    user: dto.user,
  });

  return animalFeedingDTOs.map(buildAnimalFeeding);
};
