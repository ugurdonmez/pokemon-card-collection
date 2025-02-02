import React, { useEffect, useState } from 'react';
import { Col, Row, Spin } from 'antd';
import CardItem from './CardItem';
import ashCollection from '../data/ash_collection.json';

export interface PokemonCard {
    id: string;
    name: string;
    supertype: string;
    subtypes: string[];
    hp?: string;
    types?: string[];
    attacks?: {
        cost: string[];
        name: string;
        text: string;
        damage: string;
        convertedEnergyCost: number;
    }[];
    weaknesses?: {
        type: string;
        value: string;
    }[];
    retreatCost?: string[];
    convertedRetreatCost?: number;
    number: string;
    artist: string;
    rarity: string;
    flavorText?: string;
    nationalPokedexNumbers?: number[];
    legalities: {
        unlimited: string;
    };
    images: {
        small: string;
        large: string;
    };
    rules?: string[];
}

const CardList: React.FC = () => {
    const [cards, setCards] = useState<PokemonCard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCards = async () => {
            setCards(ashCollection as unknown as PokemonCard[]);
            setLoading(false);
        };

        fetchCards();
    }, []);

    if (loading) {
        return <Spin size="large" />;
    }

    return (
        <Row gutter={16}>
            {cards.map((card) => (
                <Col span={8} key={card.id}>
                    <CardItem pokemonCard={card} />
                </Col>
            ))}
        </Row>
    );
};

export default CardList;