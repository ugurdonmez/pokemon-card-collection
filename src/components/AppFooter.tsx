import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Footer
      style={{
        textAlign: 'center',
        background: 'linear-gradient(45deg, #7873f5, #ff6ec4)',
        color: '#fff',
        fontFamily: '"Comic Sans MS", cursive, sans-serif',
        fontSize: '16px',
      }}
    >
      Candy Crush Cards ©2025 Created by Your Name • Powered by React & Ant Design
    </Footer>
  );
};

export default AppFooter;
