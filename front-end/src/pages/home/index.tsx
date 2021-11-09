import React from 'react';

import AnimalFeeding from '../components/animal-feeding';
import Banner from '../components/banner';
import Footer from '../components/footer';
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
