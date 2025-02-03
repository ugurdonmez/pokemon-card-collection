import React, { useEffect, useState } from 'react';
import { Select, Slider, Input, Checkbox } from 'antd';
import { useSearchParams } from 'react-router-dom';
import './Filters.css';

interface FiltersProps {
  onFilterChange: (filters: any) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [rarity, setRarity] = useState<string[]>(searchParams.get("rarity")?.split(",") || []);
  const [cardType, setCardType] = useState<string[]>(searchParams.get("type")?.split(",") || []);
  const [pokemonType, setPokemonType] = useState<string[]>(searchParams.get("pokemonType")?.split(",") || []);
  const [hpRange, setHpRange] = useState<[number, number]>(
    searchParams.get("hp")?.split("-").map(Number) as [number, number] || [0, 300]
  );
  const [name, setName] = useState(searchParams.get("name") || "");

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
  
    if (rarity.length) newParams.set("rarity", rarity.join(","));
    else newParams.delete("rarity");
  
    if (cardType.length) newParams.set("type", cardType.join(","));
    else newParams.delete("type");
  
    if (pokemonType.length) newParams.set("pokemonType", pokemonType.join(","));
    else newParams.delete("pokemonType");
  
    newParams.set("hp", `${hpRange[0]}-${hpRange[1]}`);
  
    if (name) newParams.set("name", name);
    else newParams.delete("name");
  
    if (newParams.toString() !== searchParams.toString()) {
      setSearchParams(newParams, { replace: true });
    }
  
    onFilterChange({ rarity, cardType, pokemonType, hpRange, name });
  }, [rarity, cardType, pokemonType, hpRange, name]);
  
  return (
    <div className="filters-container">
      {/* Search by Name */}
      <div className="filter-item">
        <span>Search Name:</span>
        <Input 
          placeholder="Enter card name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>

      {/* Rarity Filter */}
      <div className="filter-item">
        <span>Rarity:</span>
        <Select
          mode="multiple"
          placeholder="Select Rarity"
          value={rarity}
          onChange={setRarity}
          className="filter-select"
        >
          <Select.Option value="Common">Common</Select.Option>
          <Select.Option value="Uncommon">Uncommon</Select.Option>
          <Select.Option value="Rare">Rare</Select.Option>
          <Select.Option value="Legendary">Legendary</Select.Option>
        </Select>
      </div>

      {/* Card Type Filter */}
      <div className="filter-item">
        <span>Card Type:</span>
        <Checkbox.Group 
          options={["Pokémon", "Trainer", "Energy"]} 
          value={cardType}
          onChange={(values) => setCardType(values as string[])}
        />
      </div>

      {/* Pokémon Type Filter */}
      <div className="filter-item">
        <span>Pokémon Type:</span>
        <Select
          mode="multiple"
          placeholder="Select Pokémon Type"
          value={pokemonType}
          onChange={setPokemonType}
          className="filter-select"
        >
          {["Fire", "Water", "Electric", "Grass", "Psychic", "Fighting", "Dark", "Fairy"].map(type => (
            <Select.Option key={type} value={type}>{type}</Select.Option>
          ))}
        </Select>
      </div>

      {/* HP Range Filter */}
      <div className="filter-item">
        <span>HP Range:</span>
        <Slider
          range
          min={0}
          max={300}
          value={hpRange}
          onChange={(value) => setHpRange(value as [number, number])}
        />
      </div>
    </div>
  );
};

export default Filters;
