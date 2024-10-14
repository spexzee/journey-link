import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'black' }}>
      <h1 style={{ color: 'white' }}>Welcome to the Dashboard</h1>
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => navigate('/login')} 
          style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer', borderRadius: '5px', marginRight: '10px' }}
        >
          LOGIN
        </button>
        <button 
          onClick={() => navigate('/register')} 
          style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer', borderRadius: '5px' }}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
