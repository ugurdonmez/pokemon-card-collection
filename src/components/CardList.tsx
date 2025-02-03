import { List, Empty } from 'antd';
import CardItem from '@components/CardItem';
import { PokemonCard } from '@types';
import './CardList.css'; 


interface CardListProps {
  cards: PokemonCard[];
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
  return (
    <div className="card-list-container">
      {cards.length > 0 ? (
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 4,
            xxl: 4,
          }}
          style={{ width: '100%' }}
          dataSource={cards}
          renderItem={(card: PokemonCard) => (
            <List.Item key={card.id}>
              <CardItem pokemonCard={card} />
            </List.Item>
          )}
        />
      ) : (
        <Empty description="No Pokémon Cards Available" className="empty-state" />
      )}
    </div>
  );
};

export default CardList;
