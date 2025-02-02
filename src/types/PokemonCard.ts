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
