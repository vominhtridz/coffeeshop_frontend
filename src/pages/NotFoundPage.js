import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ 
      textAlign: 'center', 
      marginTop: '50px', 
      padding: '2rem',
      fontFamily: 'Arial, sans-serif' 
    }}>
      <h1>404</h1>
      <h2>Không Tìm Thấy Trang</h2>
      <p>Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
      <Link 
        to="/" 
        style={{ 
          color: '#c8a2c8', 
          fontWeight: 'bold', 
          textDecoration: 'none' 
        }}
      >
        Quay về Trang Chủ
      </Link>
    </div>
  );
};

export default NotFoundPage;