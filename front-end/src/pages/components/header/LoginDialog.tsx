import React from 'react';
import { connect } from 'react-redux';

import { bindActionCreators, Dispatch } from 'redux';

import Dialog from '../../../components/Dialog';
import { MESSAGE } from '../../../constants/indext';
import { ApplicationState } from '../../../store';
import { loadRequest } from '../../../store/ducks/login/actions';

type StateProps = {
  accessDenied: boolean;
  error: boolean;
  loading: boolean;
};

type DispatchProps = {
  loadRequest: (email: string, password: string) => void;
};

type OwnProps = {
  children?: never;
  className?: string;
};

type Props = StateProps & DispatchProps & OwnProps;

const LoginDialog: React.FC<Props> = (props) => {
  const loginRequest = (formData: any) => {
    if (!!formData.email && !!formData.password) props.loadRequest(formData.email, formData.password);
  };

  const alertType = props.accessDenied ? 'warning' : props.error ? 'error' : undefined;
  const alertMessage = props.accessDenied ? MESSAGE.UNAUTHORIZED_USER : props.error ? MESSAGE.REQUESTING_ERROR : '';

  return (
    <Dialog
      className={props.className}
      buttonLabel="Login"
      title="Access Now"
      text=""
      submitButtonLabel="Submit"
      handleSubmitData={loginRequest}
      loading={props.loading}
      alert={alertType}
      alertMessage={alertMessage}
      textInputs={[
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

const mapStateToProps = (state: ApplicationState) => ({
  accessDenied: state.auth.accessDenied,
  error: state.auth.error,
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ loadRequest }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog);
