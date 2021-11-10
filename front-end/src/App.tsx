import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Banner from './pages/components/banner';
import Footer from './pages/components/footer';
import Header from './pages/components/header';
import Routes from './routes';
import store from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Banner />
        <Header />
        <Routes />
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
