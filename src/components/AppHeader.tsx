import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import './AppHeader.css';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  return (
    <Header className="header">
      {/* Logo / Title */}
      <div className="header-logo">Pokémon Card Collection</div>

      {/* Custom Navigation Menu */}
      <nav className="custom-menu">
        <Link to="/summary" className="menu-item is-active">
          Collection
        </Link>
        <Link to="/cards" className="menu-item">
          Cards
        </Link>
        <Link to="/about" className="menu-item">
          About
        </Link>
      </nav>
    </Header>
  );
};

export default AppHeader;