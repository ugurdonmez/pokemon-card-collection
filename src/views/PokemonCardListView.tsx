import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../store/loadingSlice';
import CardList from '../components/CardList';
import Filters from '../components/CardListFilters';

const PokemonCardListView: React.FC = () => {
  const dispatch = useDispatch();
  const [cards, setCards] = useState<any[]>([]);
  const [filteredCards, setFilteredCards] = useState<any[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      dispatch(setLoading(true));
      try {
        const data = await import('../data/ash_collection.json');
        setCards(data.default);
        setFilteredCards(data.default);
      } catch (error) {
        console.error('Error fetching cards:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchCards();
  }, [dispatch]);

  const handleFilterChange = (filters: any) => {
    const filtered = cards.filter((card) => {
      return (
        (!filters.rarity.length || filters.rarity.includes(card.rarity)) &&
        (!filters.cardType.length || filters.cardType.includes(card.supertype)) &&
        (!filters.pokemonType.length || filters.pokemonType.some((type: any) => card.types?.includes(type))) &&
        (card.hp >= filters.hpRange[0] && card.hp <= filters.hpRange[1]) &&
        (!filters.name || card.name.toLowerCase().includes(filters.name.toLowerCase()))
      );
    });

    setFilteredCards(filtered);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Pokémon Card Collection</h1>
      <Filters onFilterChange={handleFilterChange} />
      <CardList cards={filteredCards} />
    </div>
  );
};

export default PokemonCardListView;
