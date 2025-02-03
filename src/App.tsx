import React from 'react';
import AppLayout from './components/AppLayout';
import PokemonCardListView from './views/PokemonCardListView';

const App: React.FC = () => {
  return (
    <AppLayout>
      <PokemonCardListView />
    </AppLayout>
  );
};

export default App;
