import React from 'react';
import { Link } from 'react-router-dom';

import { CircularProgress as Loading, IconButton as Button, Typography, Link as LinkText, Grow as Transition } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import { Add as AddIcon } from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';
import styled from 'styled-components';

import { ROUTES } from '../../../routes';
import { AnimalFeeding } from '../../../store/ducks/animal-feeding/types';

import { TableContainerStyled } from './components/styles';
import TableBody from './components/TableBody';
import TableHeader from './components/TableHead';

type Props = {
  headerLabels: Array<string>;
  animalFeeding: Array<AnimalFeeding>;
  loading: boolean;
  error: boolean;
  children?: never;
  onClickTryAgain: () => void;
};

const DashboardAnimalFeedingView: React.FC<Props> = (props) => {
  if (props.loading)
    return (
      <Container>
        <Loading className="container-alert" />
      </Container>
    );

  if (props.error)
    return (
      <Container>
        <Alert className="container-alert" severity="error" component="span">
          <AlertTitle>Error</AlertTitle>
          <Typography className="haeder-label" variant="h6">
            There was a failed request.{' '}
            <LinkText href="#" onClick={props.onClickTryAgain}>
              Try again?
            </LinkText>
          </Typography>
        </Alert>
      </Container>
    );

  return (
    <Transition in={true} timeout={2000}>
      <Container>
        <Link id="add-new-animal-feeding-button" to={ROUTES.NEW_ANIMAL_FEEDING.path}>
          <Button aria-label="delete">
            <AddIcon />
          </Button>
        </Link>
        <TableContainer component={TableContainerStyled}>
          <Table aria-label="simple table">
            <TableHeader labels={props.headerLabels} />
            <TableBody elements={props.animalFeeding} />
          </Table>
        </TableContainer>
      </Container>
    </Transition>
  );
};

export default DashboardAnimalFeedingView;

const Container = styled.section`
  display: flex;
  flex-direction: column;

  #add-new-animal-feeding-button {
    align-self: end;
  }

  .container-alert {
    width: fit-content;
    align-self: center;
  }
`;
