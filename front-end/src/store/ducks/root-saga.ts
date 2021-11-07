import { all, takeLatest } from 'redux-saga/effects';

import { loadAnimalFeedingData } from './animal-feeding/sagas';
import { Types as AnimalFeedingTypes } from './animal-feeding/types';

export default function* rootSaga() {
  return yield all([takeLatest(AnimalFeedingTypes.LOAD_REQUEST, loadAnimalFeedingData)]);
}
