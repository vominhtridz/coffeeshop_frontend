import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Component này bọc các route của USER (ví dụ: trang Đặt bàn)
const PrivateRoute = () => {
  const { currentUser } = useAuth();

  // Nếu đã đăng nhập (currentUser có tồn tại), cho phép truy cập
  // <Outlet /> đại diện cho component con (ví dụ: BookingPage)
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;