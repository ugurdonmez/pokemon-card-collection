import React from 'react';
import AppLayout from '@components/AppLayout';
import PokemonCardListView from './views/PokemonCardListView';
import { Routes, Route } from 'react-router-dom';
import SummaryView from './views/SummaryView';


const App: React.FC = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/cards" element={<PokemonCardListView />} />
        <Route path="/summary" element={<SummaryView />} />
      </Routes>
    </AppLayout>
  );
};

export default App;