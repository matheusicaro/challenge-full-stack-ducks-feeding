import React from 'react';

import {
  FormHelperText,
  Button,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  CircularProgress as Loading,
} from '@material-ui/core';
import { Send as SendIcon } from '@material-ui/icons';
import styled from 'styled-components';

import { EventMaterialInput, EventHtml, NewFeedingFormData, HandleInputChangeType } from './types';

type Props = {
  onClickSubmitButton: () => void;
  handleInputChange: HandleInputChangeType;
  loading: boolean;
  invalidFormData: boolean;
  formData: NewFeedingFormData;
  children: React.ReactNode;
};

const FormNewAnimalFeeding: React.FC<Props> = (props) => {
  const handleInputChange: EventHtml = (event) => props.handleInputChange(event.target.value, event.target.name);
  const handleSelectChange: EventMaterialInput = (event) => props.handleInputChange(event.target.value, event.target.name);

  return (
    <FormContainer noValidate autoComplete="off">
      <section className="form-input-increments ">
        <InputLabel>Animal</InputLabel>
        <Select name="animalName" value={props.formData.animalName} onChange={handleSelectChange}>
          <MenuItem value={'duck'}>DUCK</MenuItem>
        </Select>
      </section>

      <TextField
        className="form-input-increments "
        label={`How many ${props.formData.animalName}s are fed?`}
        type="number"
        name="animalQuantity"
        value={props.formData.animalQuantity}
        onChange={handleInputChange}
        inputProps={{ min: '0' }}
      />

      <section id="form-input-time">
        <TextField
          name="feedingTime"
          label={`What time the ${props.formData.animalName}s are fed?`}
          type="time"
          value={props.formData.feedingTime}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
          inputProps={{ step: 300 }}
        />
      </section>

      <TextField name="foodName" label={`What food the ${props.formData.animalName}s are fed?`} type="text" onChange={handleInputChange} />

      <TextField
        name="foodType"
        label={`What kind of food the ${props.formData.animalName}s are fed?`}
        type="text"
        onChange={handleInputChange}
      />

      <section className="form-input-increments ">
        <InputLabel>{`How much food the ${props.formData.animalName}s are fed?`}</InputLabel>
        <Input
          name="quantityKilos"
          onChange={handleInputChange}
          inputProps={{ min: '0', type: 'number' }}
          endAdornment={
            <InputAdornment id="form-input-food-quantity-kg" position="end">
              Kg
            </InputAdornment>
          }
        />
      </section>

      <section id="form-input-location">
        <TextField
          name="location"
          label={`Where the ${props.formData.animalName}s are fed?`}
          type="text"
          placeholder="Example: Vancouver, BC, Canada"
          onChange={handleInputChange}
        />
        <FormHelperText>District, City/Province, Country </FormHelperText>
      </section>

      <Button
        variant="contained"
        color="primary"
        endIcon={props.loading ? <Loading size={20} /> : <SendIcon />}
        onClick={props.onClickSubmitButton}
        disabled={props.invalidFormData || props.loading}
      >
        Send
      </Button>

      {props.children}
    </FormContainer>
  );
};

export default FormNewAnimalFeeding;

const FormContainer = styled.form`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 60px;
  grid-row-gap: 40px;

  border: 1px solid rgba(0, 0, 0, 0.23);
  padding: 50px 30px;
  border-radius: 5px;
  margin: 0% 20%;

  #form-input-time,
  .form-input-increments {
    & > div {
      min-width: 100%;
    }

    input[type='number'] {
      text-align-last: end;
      ::-webkit-outer-spin-button,
      ::-webkit-inner-spin-button {
        appearance: textfield;
        margin-left: 10px;
      }
    }
  }

  #form-input-time > div > div {
    width: fit-content;
  }

  #form-input-location {
    grid-column: 1 / 3;

    & > div {
      width: 100%;
    }
  }

  & > button {
    grid-column-start: 3;
  }
`;
