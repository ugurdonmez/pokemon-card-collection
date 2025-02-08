import React from 'react';
import { Card } from 'antd';
import { PokemonCard } from '@types';
import './CardItem.css';


interface CardItemProps {
    pokemonCard: PokemonCard;
}

const CardItem: React.FC<CardItemProps> = ({ pokemonCard }) => {

    return (
        <Card
            title={pokemonCard.name}
            cover={<img alt={pokemonCard.name} src={pokemonCard.images.small} />}
            style={{ width: 240, margin: '16px' }}
        >
            <p>Rarity: {pokemonCard.rarity}</p>
            <p>{pokemonCard.flavorText}</p>
        </Card>
    );
};

export default CardItem;