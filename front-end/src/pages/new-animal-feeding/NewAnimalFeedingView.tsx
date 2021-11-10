import React from 'react';

import { Typography } from '@material-ui/core';
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
    <Container>
      <Typography className="Global-alignment" variant="h3" align="center" color="primary" style={{ marginBottom: '35px' }}>
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
  );
};

export default NewAnimalFeedingPageView;

const Container = styled.article`
  #form-alert {
    grid-column: 1 / 4;
  }
`;
