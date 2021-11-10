import React, { Fragment } from 'react';

import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const Contextualization: React.FC = (props) => {
  return (
    <Fragment>
      <Typography variant="h3" align="center" color="primary" style={{ marginBottom: '35px' }}>
        Let's help the scientist ?
      </Typography>
      <Typography variant="h5" paragraph={true} component="p">
        A scientist is trying to understand how ducks are being fed in parks around the world. She wants to collect the following
        information:
      </Typography>
      <Ul>
        <Typography variant="h6" component="li">
          What time the ducks are fed
        </Typography>
        <Typography variant="h6" component="li">
          What food the ducks are fed
        </Typography>
        <Typography variant="h6" component="li">
          Where the ducks are fed
        </Typography>
        <Typography variant="h6" component="li">
          How many ducks are fed
        </Typography>
        <Typography variant="h6" component="li">
          What kind of food the ducks are fed
        </Typography>
        <Typography variant="h6" component="li">
          How much food the ducks are fed
        </Typography>
      </Ul>
      <Typography variant="h5" paragraph={true} component="p">
        The scientist would like to crowdsource this information by creating a web application where people can submit these data points.
        The scientist would like to be able to do reporting on the data for her PhD thesis.
      </Typography>
    </Fragment>
  );
};

export default Contextualization;

const Ul = styled.ul`
  padding: 0% 20%;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
`;
