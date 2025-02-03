import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../store/loadingSlice';
import CardList from '../components/CardList';

const PokemonCardListView: React.FC = () => {
  const dispatch = useDispatch();
  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      dispatch(setLoading(true)); // Start Loading

      try {
        const data = await import('../data/ash_collection.json');
        setCards(data.default);
      } catch (error) {
        console.error('Error fetching cards:', error);
      } finally {
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 1000);
      }
    };

    fetchCards();
  }, [dispatch]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Pokémon Card Collection</h1>
      <CardList cards={cards}/>
    </div>
  );
};

export default PokemonCardListView;
