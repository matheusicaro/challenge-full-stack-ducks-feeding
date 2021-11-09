import React, { useState } from 'react';

import ApiService from '../../services/api.service';
import { AnimalFeedingDTO, NewAnimalFeeding } from '../../services/types';
import Banner from '../components/banner';
import Footer from '../components/footer';
import Header from '../components/header';

import NewAnimalFeedingPageView from './NewAnimalFeedingView';
import { NewAnimalFeedingState } from './types';

const NewAnimalFeedingPage: React.FC = (props) => {
  const [state, setState] = useState<NewAnimalFeedingState>(initialState());

  const onError = () => setState((prev) => ({ ...prev, loading: false, error: true }));

  const onSuccess = ({ data }: { data: AnimalFeedingDTO }) => setState((prev) => ({ ...prev, data, loading: false, success: true }));

  const sendNewAnimalFeeding = (data: NewAnimalFeeding, animal: string) => {
    if (!state.loading || !state.error) setState((prev) => ({ ...prev, loading: true, error: false, success: false }));

    ApiService.saveAnimalFeeding(data, animal)
      .then(onSuccess)
      .catch(onError);
  };

  return (
    <main>
      <Banner />
      <Header />
      <NewAnimalFeedingPageView submitFormData={sendNewAnimalFeeding} />
      loading: {state.loading ? 'true' : 'false'}
      <br />
      success: {state.success ? 'true' : 'false'}
      <br />
      error: {state.error ? 'true' : 'false'}
      <br />
      <Footer />
    </main>
  );
};

export default NewAnimalFeedingPage;

const initialState = (): NewAnimalFeedingState => ({
  error: false,
  loading: false,
  success: false,
});
