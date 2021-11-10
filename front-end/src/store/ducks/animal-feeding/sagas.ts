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

/**
 * Function to remove leading zeros for decimal places greater than 3
 *
 * @param  {number} number - example input 45.20000000
 * @returns {string} - 45.200
 */
const removeInsignificantTrailingZeros = (number: number) => number.toFixed(3).replace(/(\.0+|0+)$/, '');

/**
 * Function to format numeric values to string with desired formatted in kilograms.
 *
 * @param  {number} quantityKilos - example input 1245.205600
 * @returns {string} - 1245.205 kg
 */
const formatQuantityKilos = (quantityKilos: number): string => {
  const numberAsFloat = quantityKilos ? parseFloat(quantityKilos.toString()).toFixed(3) : '';

  if (!numberAsFloat) return '-';

  return `${removeInsignificantTrailingZeros(parseFloat(numberAsFloat))} kg`;
};

/**
 * Role responsible for creating model from the right of the integration api
 *
 * @param  {Array<AnimalFeedingDTO>} animalFeedingDTOs
 * @returns {Array<AnimalFeeding>}
 */
const buildAnimalFeedingFromDTO = (animalFeedingDTOs: Array<AnimalFeedingDTO>): Array<AnimalFeeding> => {
  const buildAnimalFeeding = (dto: AnimalFeedingDTO): AnimalFeeding => ({
    id: dto.id,
    animal: dto.animal,
    createdAt: new Date(dto.created_at),
    feeding: {
      ...dto.feeding,
      quantityKilos: dto.feeding.quantity_kilos,
      quantityKilosFormatted: formatQuantityKilos(dto.feeding.quantity_kilos),
    },
    user: dto.user,
  });

  return animalFeedingDTOs.map(buildAnimalFeeding);
};
