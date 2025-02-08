import React from 'react';
import AppLayout from '@components/AppLayout';
import PokemonCardListView from './views/PokemonCardListView';
import { Routes, Route } from 'react-router-dom';
import SummaryView from './views/SummaryView';
import AboutView from './views/AboutView';

const App: React.FC = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/cards" element={<PokemonCardListView />} />
        <Route path="/summary" element={<SummaryView />} />
        {/* TODO: fix route / and /summary */}
        <Route path="/" element={<SummaryView />} />
        <Route path="/about" element={<AboutView />} />
      </Routes>
    </AppLayout>
  );
};

export default App;