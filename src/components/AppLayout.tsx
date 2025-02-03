import React from 'react';
import { Layout } from 'antd';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

const { Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
      
      <Content style={{ margin: '20px' }}>
        {children}
      </Content>
      
      <AppFooter />
    </Layout>
  );
};

export default AppLayout;
