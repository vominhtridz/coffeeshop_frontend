import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './Auth.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAdmin } = useAuth(); // Lấy hàm login từ context
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      
      // Lấy thông tin role (đã được cập nhật trong context)
      // Cần một mẹo nhỏ vì state 'isAdmin' có thể chưa cập nhật ngay
      const user = JSON.parse(localStorage.getItem('user'));
      const isAdminUser = user.roles.includes('ROLE_ADMIN');

      toast.success('Đăng nhập thành công!');
      
      if (isAdminUser) {
        navigate('/admin'); // Chuyển hướng Admin
      } else {
        navigate('/booking'); // Chuyển hướng User
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Lỗi đăng nhập';
      toast.error(errMsg);
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Đăng Nhập</h2>
        <div className="form-group">
          <label htmlFor="username">Tài khoản (root)</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu (rootpassword)</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;