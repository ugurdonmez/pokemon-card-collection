import React from 'react';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { RootState } from '../store';

const GlobalSpinner: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  if (!isLoading) return null;

  return (
    <div className="spinner-overlay">
      <ClipLoader size={50} color="#FF6A00" />
    </div>
  );
};

export default GlobalSpinner;
