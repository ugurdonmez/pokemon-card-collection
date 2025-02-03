import React from 'react';
import { Layout } from 'antd';
import './AppHeader.css';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  return (
    <Header className="header">
      {/* Logo / Title */}
      <div className="header-logo">Pokémon Card Collection</div>

      {/* Custom Navigation Menu */}
      <nav className="custom-menu">
        <a href="#" className="menu-item is-active">
          Cards
        </a>
        <a href="#" className="menu-item">
          Games
        </a>
        <a href="#" className="menu-item">
          Jobs
        </a>
        <a href="#" className="menu-item">
          Gift Cards
        </a>
        <a href="#" className="menu-item">
          Community
        </a>
      </nav>
    </Header>
  );
};

export default AppHeader;
