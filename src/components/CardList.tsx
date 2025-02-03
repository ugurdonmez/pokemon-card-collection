import { List } from 'antd';
import CardItem from '@components/CardItem';
import { PokemonCard } from '@types';

interface CardListProps {
  cards: PokemonCard[];
}

const CardList: React.FC<CardListProps> = ({cards}) => {
  // const [cards, setCards] = useState<PokemonCard[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   setCards(ashCollection as unknown as PokemonCard[]);
  //   setLoading(false);
  // }, []);

  // if (loading) {
  //   return <Spin size="large" />;
  // }

  return (
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
  );
};

export default CardList;
