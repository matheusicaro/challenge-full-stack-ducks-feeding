import React, { Fragment } from 'react';

import { Link as LinkText, Typography } from '@material-ui/core';
import styled from 'styled-components';

import DuckWorkingImage from '../../assets/images/duck_crying_in_the_rain.gif';
import DucklingHere from '../../assets/images/duckling_here.png';
import PageUnderconstruct from '../../assets/images/page_underconstruct.png';
import Banner from '../components/banner';
import Footer from '../components/footer';
import Header from '../components/header';

const DOCUMENTATION_LINK = {
  PROJECT_DIAAGRAM: {
    url: 'https://github.com/matheusicaro/challenge-full-stack-ducks-feeding/tree/master/documentation',
    text: 'Documentation diagrams for this project',
  },
  INTERFACE_DIAAGRAM: {
    url: 'https://github.com/matheusicaro/challenge-full-stack-ducks-feeding/blob/master/documentation/interface-diagram.drawio.png',
    text: 'Page interface diagram',
  },
};

const MySchedules: React.FC = () => {
  return (
    <Fragment>
      <Banner />
      <Header />
      <Container>
        <img id="image-duck-working" src={DuckWorkingImage} alt="duck working" />
        <img id="image-page-underconstruct" src={PageUnderconstruct} alt="page underconstruct" width={350} />
        <img id="image-page-duckling" src={DucklingHere} alt="duckling here" />

        <Typography id="title" variant="h3" align="center" color="primary" style={{ marginBottom: '35px' }}>
          Page under construction
          <span>wait for news.</span>
        </Typography>
        <Typography className="text paragraphs" variant="h5" component="p">
          Unfortunately this page is under construction, and not yet available. But don't be sad, you can find out more about the projectand
          what this page will look like in the future through the project documentation:
        </Typography>

        <ul className="text paragraphs" style={{ alignSelf: 'end' }}>
          <Typography variant="h6" component="li">
            <LinkText href={DOCUMENTATION_LINK.PROJECT_DIAAGRAM.url}>{DOCUMENTATION_LINK.PROJECT_DIAAGRAM.text}</LinkText>
          </Typography>
          <Typography className="text" variant="h6" component="li">
            <LinkText href={DOCUMENTATION_LINK.INTERFACE_DIAAGRAM.url}>{DOCUMENTATION_LINK.INTERFACE_DIAAGRAM.text}</LinkText>
          </Typography>
        </ul>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default MySchedules;

const Container = styled.article`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-column-gap: 1px;
  grid-row-gap: 0px;

  #title {
    grid-column: 2 / 6;
    align-self: center;
    display: flex;
    flex-direction: column;

    span {
      grid-column: 4;
      align-self: end;
      margin-right: 20%;
      opacity: 0.3;
    }
  }

  .text {
    grid-column: 2 / 6;
  }

  .paragraphs {
    grid-row: 2 / 2;
  }

  & > ul {
    align-self: center;
  }

  #image-page-underconstruct,
  #image-duck-working {
    grid-row: 1;
  }

  #image-duck-working {
    grid-column: 6 / 7;
    align-self: flex-end;
    align-self: flex-end;
    opacity: 0.7;
    width: 180px;
    margin-top: 100px;
  }

  #image-page-underconstruct {
    grid-column: 6 / 8;
    margin-left: 50px;
  }

  #image-page-duckling {
    grid-row: 2;
    height: 240px;
  }
`;
