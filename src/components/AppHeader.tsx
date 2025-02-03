import React from 'react';
import { Layout, Menu, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  return (
    <Header style={{ background: '#fff', padding: '0 20px', display: 'flex', alignItems: 'center' }}>
      {/* Logo / Title */}
      <div style={{ fontSize: '20px', fontWeight: 'bold', marginRight: '20px' }}>
        Pokémon Card Collection
      </div>
      
      {/* Navigation Menu */}
      <Menu mode="horizontal" defaultSelectedKeys={['2']} style={{ flex: 1 }}>
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Collection</Menu.Item>
        <Menu.Item key="3">About</Menu.Item>
      </Menu>
      
      {/* Search Input */}
      <Input
        placeholder="Search cards..."
        style={{ width: 200 }}
        prefix={<SearchOutlined />}
      />
    </Header>
  );
};

export default AppHeader;
