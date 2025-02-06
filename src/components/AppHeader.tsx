import React from 'react';
import { Layout } from 'antd';
import { NavLink } from 'react-router-dom';
import './AppHeader.css';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  return (
    <Header className="header">
      {/* Logo / Title */}
      <div className="header-logo">Pokémon Card Collection</div>

      {/* Custom Navigation Menu */}
      <nav className="custom-menu">
        <NavLink to="/summary" className={({ isActive }) => isActive ? 'menu-item is-active' : 'menu-item'}>
          Collection
        </NavLink>
        <NavLink to="/cards" className={({ isActive }) => isActive ? 'menu-item is-active' : 'menu-item'}>
          Cards
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'menu-item is-active' : 'menu-item'}>
          About
        </NavLink>
      </nav>
    </Header>
  );
};

export default AppHeader;