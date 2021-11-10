import { NewAnimalFeeding } from '../../services/types';

export type NewAnimalFeedingState = {
  data?: NewAnimalFeeding;
  success: boolean;
  loading: boolean;
  error: boolean;
  formData: NewFeedingFormData;
  invalidFormData: boolean;
  alertType?: 'success' | 'error';
};

export type NewFeedingFormData = {
  animalQuantity: string;
  animalName: string;
  foodName: string;
  foodType: string;
  feedingTime: string;
  location: string;
  quantityKilos: string;
};

export type EventHtml = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;

export type EventMaterialInput =
  | ((
      event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
      }>,
      child: React.ReactNode
    ) => void)
  | undefined;

export type HandleInputChangeType = (value: string | unknown, field?: string) => void;
