export type AnimalFeedingDTO = {
  id: string;
  created_at: string;
  animal: {
    quantity: number;
    name: string;
  };
  feeding: {
    id: string;
    food: {
      name: string;
      type: string;
    };
    time: string;
    location: string;
    quantity_kilos: number;
  };
  user: {
    email: string;
    name: string;
  };
};

export type NewAnimalFeeding = {
  animal: {
    quantity: number;
    name: string;
  };
  feeding: {
    food: {
      name: string;
      type: string;
    };
    time: string;
    location: string;
    quantity_kilos: number;
  };
  user: {
    email: string;
    name: string;
  };
};

export type ResponseApi<T> = {
  status: number;
  data: T;
  message?: string;
};
