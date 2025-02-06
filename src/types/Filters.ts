export interface Filters {
  hpRange: [number, number];
  name: string;
  sort: 'name' | 'hp' | 'rarity';
  sortOrder: 'asc' | 'desc';
  rarity: string[];
  cardType: string[];
  pokemonType: string[];
}