import React, { useState } from 'react';
import { Card, Tag, Tooltip, Modal } from 'antd';
import { PokemonCard } from '@types';
import './CardItem.css';
import PokemonModal from './modals/PokemonModal';

interface CardItemProps {
    pokemonCard: PokemonCard;
}

const CardItem: React.FC<CardItemProps> = ({ pokemonCard }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCardClick = () => {
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            {/* Main Card */}
            <Card
                className="card-container"
                bodyStyle={{ padding: '0' }} /* Remove default padding */
                cover={<img alt={pokemonCard.name} src={pokemonCard.images.large} className="card-image" />}
                onClick={handleCardClick}
                hoverable
            >
                <div className="card-content">
                    <h3 className="card-title">{pokemonCard.name}</h3>
                    
                    {/* Rarity & HP */}
                    <div className="card-subheader">
                        <Tag color="gold">{pokemonCard.rarity || "Unknown Rarity"}</Tag>
                        {pokemonCard.hp && <Tag color="red">HP: {pokemonCard.hp}</Tag>}
                    </div>

                    {/* Pokémon Types */}
                    {pokemonCard.types && (
                        <div className="card-types">
                            {pokemonCard.types.map((type) => (
                                <Tag key={type} className={`type-${type.toLowerCase()}`}>{type}</Tag>
                            ))}
                        </div>
                    )}

                </div>
            </Card>

            {/* Modal */}
            <PokemonModal
                isVisible={isModalVisible}
                onClose={handleModalClose}
                pokemonCard={pokemonCard}
            />

        </>
    );
};

export default CardItem;
