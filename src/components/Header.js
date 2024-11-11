import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ padding: '20px', background: '#003f5c', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 style={{ margin: 0 }}>Customer International Payment Portal</h1>
      <nav>
        <Link style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }} to="/register">Register</Link>
        <Link style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }} to="/login">Login</Link>
        <Link style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }} to="/employeelogin">Employee Login</Link>
      </nav>
    </header>
  );
};

export default Header;
