import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      Pokémon Card Collection ©2025 Created by Your Name • Powered by React & Ant Design
    </Footer>
  );
};

export default AppFooter;
