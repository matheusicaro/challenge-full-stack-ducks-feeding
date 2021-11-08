import React from 'react';

import AnimalFeeding from '../components/animal-feeding';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Header from '../components/header';

const HomePage: React.FC = (props) => {
  return (
    <main>
      <Banner />
      <Header />
      <AnimalFeeding />
      <Footer />
    </main>
  );
};

export default HomePage;
