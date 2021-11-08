import { NewAnimalFeeding } from '../../services/types';

export type NewAnimalFeedingState = {
  data?: NewAnimalFeeding;
  success: boolean;
  loading: boolean;
  error: boolean;
};
