import React from 'react';
import { Layout, Menu, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  return (
    <Header
      style={{
        background: 'linear-gradient(45deg, #ff6ec4, #7873f5)',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      }}
    >
      {/* Logo / Title */}
      <div
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginRight: '20px',
          color: '#fff',
          fontFamily: '"Comic Sans MS", cursive, sans-serif',
        }}
      >
        Pokémon Card Collection
      </div>

      {/* Navigation Menu */}
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ flex: 1, background: 'transparent', borderBottom: 'none' }}
      >
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Collection</Menu.Item>
        <Menu.Item key="3">About</Menu.Item>
      </Menu>

      {/* Search Input */}
      <Input
        placeholder="Search candies..."
        style={{
          width: 200,
          borderRadius: '20px',
          border: 'none',
          background: '#fff',
        }}
        prefix={<SearchOutlined style={{ color: '#ff6ec4' }} />}
      />
    </Header>
  );
};

export default AppHeader;
