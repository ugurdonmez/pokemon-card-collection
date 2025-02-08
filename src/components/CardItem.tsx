import React, { useState } from 'react';
import { Card, Tag, Tooltip, Modal } from 'antd';
import { PokemonCard } from '@types';
import './CardItem.css';

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

            {/* Modal for Additional Details */}
            <Modal
                title={pokemonCard.name}
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
                centered
            >
                {/* Pokémon Image */}
                <img
                    alt={pokemonCard.name}
                    src={pokemonCard.images.large}
                    style={{ width: '100%', marginBottom: '16px', borderRadius: '8px' }}
                />

                {/* Rarity & HP */}
                <div className="modal-subheader">
                    <Tag color="gold">{pokemonCard.rarity || "Unknown Rarity"}</Tag>
                    {pokemonCard.hp && <Tag color="red">HP: {pokemonCard.hp}</Tag>}
                </div>

                {/* Pokémon Types */}
                {pokemonCard.types && (
                    <div className="modal-types">
                        {pokemonCard.types.map((type) => (
                            <Tag key={type} className={`type-${type.toLowerCase()}`}>{type}</Tag>
                        ))}
                    </div>
                )}

                {/* Evolution Info */}
                {pokemonCard.evolvesFrom && <p><strong>Evolves from:</strong> {pokemonCard.evolvesFrom}</p>}
                {pokemonCard.evolvesTo && pokemonCard.evolvesTo.length > 0 && (
                    <p><strong>Evolves to:</strong> {pokemonCard.evolvesTo.join(', ')}</p>
                )}

                {/* Attacks */}
                {pokemonCard.attacks && pokemonCard.attacks.length > 0 && (
                    <div className="modal-attacks">
                        <h4>Attacks:</h4>
                        {pokemonCard.attacks.map((attack) => (
                            <Tooltip key={attack.name} title={attack.text}>
                                <p><strong>{attack.name}</strong> - {attack.damage}</p>
                            </Tooltip>
                        ))}
                    </div>
                )}

                {/* Weaknesses & Resistances */}
                <div className="modal-stats">
                    {pokemonCard.weaknesses && (
                        <div className="weakness-section">
                            <h4>Weaknesses:</h4>
                            {pokemonCard.weaknesses.map((weakness) => (
                                <Tag key={weakness.type} color="volcano">
                                    {weakness.type} {weakness.value}
                                </Tag>
                            ))}
                        </div>
                    )}

                    {pokemonCard.resistances && (
                        <div className="resistance-section">
                            <h4>Resistances:</h4>
                            {pokemonCard.resistances.map((resistance) => (
                                <Tag key={resistance.type} color="green">
                                    {resistance.type} {resistance.value}
                                </Tag>
                            ))}
                        </div>
                    )}
                </div>

                {/* Flavor Text */}
                {pokemonCard.flavorText && <p className="modal-flavor-text">"{pokemonCard.flavorText}"</p>}
            </Modal>
        </>
    );
};

export default CardItem;
