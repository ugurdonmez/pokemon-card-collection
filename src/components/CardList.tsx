import React, { useState } from 'react';
import { List, Empty, Pagination } from 'antd';
import CardItem from '@components/CardItem';
import { PokemonCard } from '@types';
import './CardList.css'; 

interface CardListProps {
  cards: PokemonCard[];
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8); // Number of cards per page

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
  };

  const paginatedCards = cards.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="card-list-container">
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