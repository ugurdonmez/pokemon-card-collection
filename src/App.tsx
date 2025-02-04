import React from 'react';
import AppLayout from '@components/AppLayout';
import PokemonCardListView from './views/PokemonCardListView';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SummaryView from 'views/SummaryView';

const App: React.FC = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/cards" element={<PokemonCardListView />} />
          <Route path="/summary" element={<SummaryView />} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
