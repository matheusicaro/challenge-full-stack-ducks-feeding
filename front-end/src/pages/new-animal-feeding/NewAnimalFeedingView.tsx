import React from 'react';

import { Typography, Grow as Transition, Paper } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import styled from 'styled-components';

import FormNewAnimalFeeding from './FormNewAnimalFeeding';
import { NewFeedingFormData, HandleInputChangeType } from './types';

type Props = {
  onClickSubmitButton: () => void;
  handleInputChange: HandleInputChangeType;
  requestSending: {
    success: boolean;
    error: boolean;
    loading: boolean;
    alert?: 'success' | 'error';
    alertMessage?: string;
  };
  invalidFormData: boolean;
  formData: NewFeedingFormData;
};

const NewAnimalFeedingPageView: React.FC<Props> = (props) => {
  return (
    <Transition in={true} timeout={2000}>
      <Container className="Global-alignment" elevation={3} component="article">
        <Typography variant="h3" align="center" color="primary" style={{ marginBottom: '35px' }}>
          How are your animals fed ?
        </Typography>
        <FormNewAnimalFeeding
          formData={props.formData}
          handleInputChange={props.handleInputChange}
          invalidFormData={props.invalidFormData}
          loading={props.requestSending.loading}
          onClickSubmitButton={props.onClickSubmitButton}
        >
          {props.requestSending.alert && (
            <Alert id="form-alert" severity={props.requestSending.alert} component="section">
              <AlertTitle>{props.requestSending.alert}</AlertTitle>
              {props.requestSending.alertMessage}
            </Alert>
          )}
        </FormNewAnimalFeeding>
      </Container>
    </Transition>
  );
};

export default NewAnimalFeedingPageView;

const Container = styled(Paper)`
  #form-alert {
    grid-column: 1 / 4;
  }
`;
