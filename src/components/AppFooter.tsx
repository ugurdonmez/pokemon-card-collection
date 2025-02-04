import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Footer
      style={{
        textAlign: 'center',
        background: '#3b3b3b',
        color: '#fff',
        fontFamily: '"Comic Sans MS", cursive, sans-serif',
        fontSize: '16px',
        height: '100px',
      }}
    >
      <div style={{ marginTop: '10px' }}>Pokemon Cards ©2025 Created by Ugur Donmez • Powered by React & Ant Design</div>
    </Footer>
  );
};

export default AppFooter;
