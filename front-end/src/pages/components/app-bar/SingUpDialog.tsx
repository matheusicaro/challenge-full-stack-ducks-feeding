import React, { useState } from 'react';

import Dialog from '../../../components/Dialog';
import { MESSAGE } from '../../../constants/indext';
import ApiService from '../../../services/api.service';

type Props = {
  children?: never;
  className?: string;
};

type State = {
  success: boolean;
  error: boolean;
  loading: boolean;
  message?: string;
  alert?: 'success' | 'error';
};

const initialState = (): State => ({ success: false, error: false, loading: false });

const SingUpDialog: React.FC<Props> = (props: Props) => {
  const [state, setState] = useState<State>(initialState());

  const error = () =>
    setState((prev) => ({
      ...prev,
      error: true,
      loading: false,
      message: MESSAGE.REQUESTING_ERROR,
      alert: 'error',
    }));

  const success = () =>
    setState((prev) => ({
      ...prev,
      success: true,
      loading: false,
      message: MESSAGE.REGISTRATION_SUCCESS,
      alert: 'success',
    }));

  const requestRegister = (formData: any) => {
    const { name, email, password } = formData || {};

    const validInputs = name && email && password;

    if (validInputs) {
      if (!state.loading) setState((prev) => ({ ...prev, loading: true }));

      ApiService.singup(name, email, password)
        .then((response) => (response.status === 204 ? success() : error()))
        .catch(error);
    }
  };

  return (
    <Dialog
      className={props.className}
      buttonLabel="SingUp"
      title="Join now!"
      text="Sign up to register your feeding routine for your animals. Contribute to us today from anywhere in the world. Totally free."
      submitButtonLabel="Submit"
      handleSubmitData={requestRegister}
      loading={state.loading}
      alert={state.alert}
      alertMessage={state.message}
      disableSubmitButtonAfterSubmission={true}
      textInputs={[
        {
          dataKey: 'name',
          type: 'text',
          label: 'Name',
        },
        {
          dataKey: 'email',
          type: 'email',
          label: 'E-mail',
        },
        {
          dataKey: 'password',
          type: 'password',
          label: 'Password',
        },
      ]}
    />
  );
};

export default SingUpDialog;
