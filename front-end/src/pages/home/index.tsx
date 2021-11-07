import React from 'react';

import AnimalFeeding from '../components/animal-feeding';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

const HomePage: React.FC = (props) => {
  return (
    <div>
      <Banner />
      <h1>hello</h1>
      <AnimalFeeding />

      <Footer />
    </div>
  );
};

export default HomePage;
