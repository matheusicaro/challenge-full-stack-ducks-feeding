import React, { Fragment } from 'react';

import AnimalFeedingDashboard from '../components/animal-feeding-dashboard';
import Banner from '../components/banner';
import Footer from '../components/footer';
import Header from '../components/header';

import Contextualization from './Contextualization';

const HomePage: React.FC = (props) => {
  return (
    <Fragment>
      <Banner />
      <Header />
      <Contextualization />
      <AnimalFeedingDashboard />
      <Footer />
    </Fragment>
  );
};

export default HomePage;
