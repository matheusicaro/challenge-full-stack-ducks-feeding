import { put } from 'redux-saga/effects';

import { loadSuccess, loadFailure } from './actions';

/**
 * Function to get external data and return action to the store
 *
 *  @return  {Action} store action
 */
export function* loadAnimalFeedingData() {
  try {
    yield put(loadSuccess([]));
  } catch (err) {
    yield put(loadFailure());
  }
}
