import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ color: '#003f5c' }}>Welcome to the Customer Portal</h1>

      <button 
        onClick={() => navigate('/payment')}  
        style={{
          backgroundColor: '#003f5c', 
          color: 'white', 
          padding: '10px 20px', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'  
        }}
      >
        Make Payment
      </button>
    </div>
  );
};

export default Home;

