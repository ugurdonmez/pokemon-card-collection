interface PokemonCard {
  id: string;
  name: string;
  hp?: string;
  types?: string[];
  evolvesFrom?: string;
  evolvesTo?: string[];
  rarity?: string;
  supertype?: string;
  subtype?: string;
  attacks?: {
    name: string;
    cost: string[];
    convertedEnergyCost: number;
    damage: string;
    text: string;
  }[];
  weaknesses?: {
    type: string;
    value: string;
  }[];
  resistances?: {
    type: string;
    value: string;
  }[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  set?: {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    legalities: {
      unlimited: string;
      standard: string;
      expanded: string;
    };
    ptcgoCode: string;
    releaseDate: string;
    updatedAt: string;
  };
  number: string;
  artist: string;
  rarityCode: string;
  flavorText?: string;
  nationalPokedexNumbers: number[];
  legalities?: {
    unlimited: string;
    standard: string;
    expanded: string;
  };
  images: {
    small: string;
    large: string;
  };
}

export default PokemonCard;