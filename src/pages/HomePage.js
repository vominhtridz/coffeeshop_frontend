import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// CSS nội tuyến cho đơn giản
const homeStyle = {
  textAlign: 'center',
  padding: '4rem 2rem',
  backgroundColor: '#fff',
  minHeight: 'calc(100vh - 120px)',
  fontFamily: 'Arial, sans-serif'
};

const buttonStyle = {
  display: 'inline-block',
  marginTop: '1.5rem',
  padding: '0.75rem 1.5rem',
  backgroundColor: '#c8a2c8',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '4px',
  fontWeight: 'bold',
  transition: 'background-color 0.3s'
};

const HomePage = () => {
  const { currentUser, isAdmin } = useAuth();

  return (
    <div style={homeStyle}>
      <h1>Chào mừng đến với Coffee Shop!</h1>
      <p>Hệ thống quản lý và đặt bàn tiện lợi.</p>
      
      {!currentUser && (
        <div>
          <p>Vui lòng đăng nhập để bắt đầu.</p>
          <Link to="/login" style={buttonStyle}>Đăng Nhập</Link>
        </div>
      )}
      
      {currentUser && !isAdmin && (
        <div>
          <p>Bạn đã đăng nhập. Hãy bắt đầu đặt bàn!</p>
          <Link to="/booking" style={buttonStyle}>Đến Trang Đặt Bàn</Link>
        </div>
      )}

      {currentUser && isAdmin && (
        <div>
          <p>Chào Admin. Hãy vào trang quản trị.</p>
          <Link to="/admin" style={buttonStyle}>Đến Dashboard</Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;