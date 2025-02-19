import React, { useState } from 'react';
import { List, Empty, Pagination, Typography } from 'antd';
import CardItem from '@components/CardItem';
import { PokemonCard } from '@types';
import './CardList.css';

const { Text } = Typography;

interface CardListProps {
  cards: PokemonCard[];
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
  };

  const paginatedCards = cards.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="card-list-container">
      <div className="card-list-header">
        <Text className="card-count">{cards.length} Pokémon Cards Found</Text>
      </div>

      {cards.length > 0 ? (
        <>
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
            dataSource={paginatedCards}
            renderItem={(card: PokemonCard) => (
              <List.Item key={card.id}>
                <CardItem pokemonCard={card} />
              </List.Item>
            )}
          />
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={cards.length}
            onChange={handlePageChange}
            onShowSizeChange={handlePageChange}
            showSizeChanger
            style={{ textAlign: 'center', marginTop: '16px' }}
          />
        </>
      ) : (
        <Empty description="No Pokémon Cards Available" className="empty-state" />
      )}
    </div>
  );
};

export default CardList;
