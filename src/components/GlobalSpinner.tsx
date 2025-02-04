import React from 'react';
import { useSelector } from 'react-redux';
import { PacmanLoader } from 'react-spinners';
import { RootState } from '../store';

const GlobalSpinner: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  if (!isLoading) return null;

  return (
    <div className="spinner-overlay">
      <PacmanLoader size={100} color="#FF6A00" />
    </div>
  );
};

export default GlobalSpinner;
