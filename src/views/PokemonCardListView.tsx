import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../store/loadingSlice';
import CardList from '@components/CardList';
import CardListFilters from '../components/CardListFilters';
import PokemonCard from '../types/PokemonCard';

const PokemonCardListView: React.FC = () => {
  const dispatch = useDispatch();
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [, setFilteredCards] = useState<PokemonCard[]>([]);
  const [sortedCards, setSortedCards] = useState<PokemonCard[]>([]);
  const [filters, setFilters] = useState<any>({});

  useEffect(() => {
    const fetchCards = async () => {
      dispatch(setLoading(true));
      try {
        const data = await import('../data/ash_collection.json');
        // TODO: Type the data
        setCards(data.default as unknown as PokemonCard[]);
        setFilteredCards(data.default as unknown as PokemonCard[]);
        setSortedCards(data.default as unknown as PokemonCard[]);
      } catch (error) {
        console.error('Error fetching cards:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchCards();
  }, [dispatch]);

  useEffect(() => {
    let filtered = [...cards];

    // Apply filters
    if (filters.rarity && filters.rarity.length) {
      filtered = filtered.filter(card => filters.rarity.includes(card.rarity));
    }
    if (filters.cardType && filters.cardType.length) {
      filtered = filtered.filter(card => filters.cardType.includes(card.supertype));
    }
    if (filters.pokemonType && filters.pokemonType.length) {
      filtered = filtered.filter(card => card.types && card.types.some(type => filters.pokemonType.includes(type)));
    }
    if (filters.hpRange) {
      filtered = filtered.filter(card => card.hp && parseInt(card.hp) >= filters.hpRange[0] && parseInt(card.hp) <= filters.hpRange[1]);
    }
    if (filters.name) {
      filtered = filtered.filter(card => card.name.toLowerCase().includes(filters.name.toLowerCase()));
    }

    setFilteredCards(filtered);

    // Apply sorting
    const sorted = [...filtered];
    if (filters.sort) {
      sorted.sort((a, b) => {
        if (filters.sort === 'name') {
          return a.name.localeCompare(b.name);
        } else if (filters.sort === 'hp') {
          return (parseInt(a.hp || '0') - parseInt(b.hp || '0'));
        } else if (filters.sort === 'rarity') {
          return (a.rarity || '').localeCompare(b.rarity || '');
        }
        return 0;
      });
    }

    setSortedCards(sorted);
  }, [filters, cards]);

  const handleFilterChange = (filters: any) => {
    setFilters(filters);
  };

  return (
    <div>
      <CardListFilters onFilterChange={handleFilterChange} />
      <CardList cards={sortedCards} />
    </div>
  );
};

export default PokemonCardListView;