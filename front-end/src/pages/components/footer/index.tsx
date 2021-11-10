import React from 'react';

import { Typography } from '@material-ui/core';
import styled from 'styled-components';

import packageJSON from '../../../../package.json';

/**
 * Footer component
 *
 */
const Footer: React.FC = () => {
  return (
    <Container>
      <a href= {`https://${packageJSON.person.url}`} rel="noopener noreferrer" target="_blank" title="talk to me">
        <Typography variant="body1" component="span">
          {`${packageJSON.author} | ${packageJSON.person.url} | ${packageJSON.person.email}`}
        </Typography>
      </a>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  text-align: center;
  width: 100%;
  padding: 40px 0;

  & > a {
    text-decoration: auto;
    opacity: 0.4;
    color: black;

    :hover {
      text-decoration: underline;
      opacity: 1;
    }
  }
`;
