import React from 'react';
import { render } from '@testing-library/react';
import CardItem from '../../components/CardItem';
import { PokemonCard } from '@types';

const mockPokemon: PokemonCard = {
    id: '1',
    name: 'Pikachu',
    hp: '60',
    types: ['Electric'],
    rarity: 'Common',
    images: {
        small: 'https://example.com/small.png',
        large: 'https://example.com/large.png'
    },
    evolvesFrom: 'Pichu',
    evolvesTo: ['Raichu'],
    attacks: [
        {
            name: 'Thunderbolt',
            cost: ['Electric'],
            convertedEnergyCost: 2,
            damage: '50',
            text: 'A powerful electric attack.'
        }
    ],
    weaknesses: [{ type: 'Ground', value: '×2' }],
    resistances: [{ type: 'Flying', value: '-30' }],
    number: '025',
    artist: 'Ken Sugimori',
    rarityCode: 'C',
    nationalPokedexNumbers: [25],
    legalities: { unlimited: 'Legal', standard: 'Legal', expanded: 'Legal' }
};

describe('CardItem Component', () => {
    test('renders the Pokémon card correctly', () => {
        render(<CardItem pokemonCard={mockPokemon} />);

        // Check if name is displayed
        expect(screen.getByText('Pikachu')).toBeInTheDocument();

        // Check if rarity is displayed
        expect(screen.getByText('Common')).toBeInTheDocument();

        // Check if HP is displayed
        expect(screen.getByText('HP: 60')).toBeInTheDocument();

        // Check if type is displayed
        expect(screen.getByText('Electric')).toBeInTheDocument();
    });
});
