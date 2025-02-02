import React, { useEffect, useState } from 'react';
import { Col, Row, Spin } from 'antd';
import CardItem from '@components/CardItem';
import ashCollection from '../data/ash_collection.json';
import { PokemonCard } from '@types';


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