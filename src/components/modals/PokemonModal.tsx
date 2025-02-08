import React from 'react';
import { Modal, Tag, Tooltip } from 'antd';
import { PokemonCard } from '@types';
import './PokemonModal.css';

interface PokemonModalProps {
    isVisible: boolean;
    onClose: () => void;
    pokemonCard: PokemonCard;
}

const PokemonModal: React.FC<PokemonModalProps> = ({ isVisible, onClose, pokemonCard }) => {
    return (
        <Modal
            title={null}
            visible={isVisible}
            onCancel={onClose}
            footer={null}
            centered
            className="pokemon-modal"
        >
            <div className="modal-header">
                <h2 className="modal-title">{pokemonCard.name}</h2>
            </div>
            <div className="modal-content">
                {/* Pokémon Image */}
                <div className="image-section">
                    <img
                        alt={pokemonCard.name}
                        src={pokemonCard.images.large}
                        className="pokemon-image"
                    />
                </div>

                {/* Details Section */}
                <div className="details-section">
                    <div className="info-header">
                        <Tag color="gold">{pokemonCard.rarity || "Unknown Rarity"}</Tag>
                        {pokemonCard.hp && <Tag color="red">HP: {pokemonCard.hp}</Tag>}
                    </div>

                    {/* Pokémon Types */}
                    {pokemonCard.types && (
                        <div className="types-container">
                            {pokemonCard.types.map((type) => (
                                <Tag key={type} className={`type-${type.toLowerCase()}`}>
                                    {type}
                                </Tag>
                            ))}
                        </div>
                    )}

                    {/* Evolution Info */}
                    {pokemonCard.evolvesFrom && (
                        <p className="evolution-text">
                            <strong>Evolves from:</strong> {pokemonCard.evolvesFrom}
                        </p>
                    )}
                    {pokemonCard.evolvesTo && pokemonCard.evolvesTo.length > 0 && (
                        <p className="evolution-text">
                            <strong>Evolves to:</strong> {pokemonCard.evolvesTo.join(", ")}
                        </p>
                    )}

                    {/* Attacks */}
                    {pokemonCard.attacks && (
                        <div className="attacks-container">
                            <h3>Attacks:</h3>
                            {pokemonCard.attacks.map((attack) => (
                                <Tooltip key={attack.name} title={attack.text}>
                                    <p>
                                        <strong>{attack.name}</strong>: {attack.damage}
                                    </p>
                                </Tooltip>
                            ))}
                        </div>
                    )}

                    {/* Weaknesses & Resistances */}
                    <div className="stats-container">
                        {pokemonCard.weaknesses && (
                            <div className="stat-section">
                                <h3>Weaknesses:</h3>
                                {pokemonCard.weaknesses.map((weakness) => (
                                    <Tag key={weakness.type} color="volcano">
                                        {weakness.type} {weakness.value}
                                    </Tag>
                                ))}
                            </div>
                        )}

                        {pokemonCard.resistances && (
                            <div className="stat-section">
                                <h3>Resistances:</h3>
                                {pokemonCard.resistances.map((resistance) => (
                                    <Tag key={resistance.type} color="green">
                                        {resistance.type} {resistance.value}
                                    </Tag>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Flavor Text */}
                    {pokemonCard.flavorText && (
                        <p className="flavor-text">"{pokemonCard.flavorText}"</p>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default PokemonModal;
