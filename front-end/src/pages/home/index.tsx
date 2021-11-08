import React from 'react';

import AnimalFeeding from '../components/animal-feeding';
import AppBar from '../components/app-bar';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

const HomePage: React.FC = (props) => {
  return (
    <main>
      <Banner />
      <AppBar />
      <AnimalFeeding />
      <Footer />
    </main>
  );
};

export default HomePage;
