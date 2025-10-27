import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Component này bọc các route của ADMIN (ví dụ: trang Dashboard, Quản lý Menu)
const AdminRoute = () => {
  const { currentUser, isAdmin } = useAuth();

  // Kiểm tra 2 điều: 1. Đã đăng nhập; 2. Có quyền ADMIN
  return currentUser && isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
  // (Tùy chọn): Có thể chuyển hướng về trang "/" nếu đã đăng nhập nhưng không phải admin
};

export default AdminRoute;