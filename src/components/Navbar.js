import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          Coffee Shop
        </Link>
      </div>
      <div className="navbar-right">
        {currentUser ? (
          <>
            {/* Link chung cho User đã đăng nhập */}
            <Link to="/booking" className="navbar-link">
              Đặt Bàn
            </Link>

            {/* Link riêng cho Admin */}
            {isAdmin && (
              <>
                <div className="navbar-separator">|</div>
                <Link to="/admin" className="navbar-link admin-link">
                  Dashboard
                </Link>
                <Link to="/admin/orders" className="navbar-link admin-link">
                  Orders
                </Link>
                <Link to="/admin/tables" className="navbar-link admin-link">
                  Bàn
                </Link>
                <Link to="/admin/menu" className="navbar-link admin-link">
                  Menu
                </Link>
              </>
            )}

            <span className="navbar-user">Chào, {currentUser.username}!</span>
            <button onClick={handleLogout} className="navbar-button">
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">
              Đăng nhập
            </Link>
            <Link to="/register" className="navbar-button">
              Đăng ký
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;