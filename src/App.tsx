import React from 'react';
import { Outlet } from 'react-router-dom';

import { ScrollToTop } from './components/ScrollToTop';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';

export const App: React.FC = () => (
  <div className="App">
    <ScrollToTop />
    <Header />
    <main className="page__main">
      <Outlet />
    </main>
    <Footer />
  </div>
);
