import React from 'react';

import { CircularProgress as Loading } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogMaterial from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { Alert, AlertTitle } from '@material-ui/lab';
import styled from 'styled-components';

type TextInputs = Array<{
  className?: string;
  dataKey: string;
  label: string;
  type: React.InputHTMLAttributes<unknown>['type'];
}>;

type Props = {
  alert?: 'warning' | 'success' | 'error';
  alertMessage?: string;
  buttonLabel: string;
  className?: string;
  disableSubmitButton?: boolean;
  handleSubmitData: (data: any) => void;
  loading?: boolean;
  submitButtonLabel: string;
  text: string;
  textInputs: TextInputs;
  title: string;
};

/**
 * Generic component for dialog behaviors, providing dynamic forms through its properties
 *
 * @param  {number}
 * @param  {DialogMaterial}
 */
const Dialog: React.FC<Props> = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState(initialStateFormData(props.textInputs));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClickSubmit = () => {
    props.handleSubmitData(formData);
  };

  const handleTextFildOnChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const dataKey = e.target.id;

    if (dataKey) {
      const obj = { [dataKey]: e.target.value };
      setFormData((prev: any) => ({ ...prev, ...obj }));
    }
  };

  return (
    <section className={props.className}>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        {props.buttonLabel}
      </Button>
      <DialogMaterial open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.text}</DialogContentText>
          {props.textInputs.map((element) => (
            <TextField
              key={element.label}
              className={element.className}
              autoFocus
              margin="dense"
              id={element.dataKey}
              label={element.label}
              type={element.type}
              fullWidth
              onChange={handleTextFildOnChange}
            />
          ))}
        </DialogContent>
        <Section>
          {props.loading && <Loading className="dialog-loading" />}
          <DialogActions className="dialog-buttons">
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={onClickSubmit} color="primary" disabled={props.disableSubmitButton}>
              {props.submitButtonLabel}
            </Button>
          </DialogActions>
        </Section>

        {props.alert && (
          <Alert severity={props.alert}>
            <AlertTitle>{props.alert}</AlertTitle>
            {props.alertMessage}
          </Alert>
        )}
      </DialogMaterial>
    </section>
  );
};

export default Dialog;

const initialStateFormData = (textInputs: TextInputs) => {
  const formDataState: any = {};

  textInputs.forEach(({ dataKey }) => {
    formDataState[dataKey] = '';
  });

  return formDataState;
};

const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  margin: 5% 0;

  .dialog-loading {
    grid-column: 2;
  }

  .dialog-buttons {
    grid-column: 3;
  }
`;
