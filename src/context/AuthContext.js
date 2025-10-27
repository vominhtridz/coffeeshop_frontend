import React, { createContext, useState, useContext, useEffect } from 'react';
import AuthService from '../services/auth.service';

// 1. Tạo Context
const AuthContext = createContext();

// 2. Tạo Provider (Component cha bao bọc)
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Thêm cờ loading

  // 3. Kiểm tra xem user đã đăng nhập chưa khi load ứng dụng
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false); // Hoàn tất kiểm tra
  }, []);

  // 4. Định nghĩa hàm login
  const login = async (username, password) => {
    try {
      const userData = await AuthService.login(username, password);
      setCurrentUser(userData);
    } catch (error) {
      // Ném lỗi ra để component LoginPage có thể bắt và hiển thị
      throw error;
    }
  };

  // 5. Định nghĩa hàm logout
  const logout = () => {
    AuthService.logout();
    setCurrentUser(null);
  };

  // 6. Cung cấp state và hàm cho các component con
  const value = {
    currentUser,
    login,
    logout,
    // (Tùy chọn) Thêm hàm check role
    // SỬA LỖI Ở ĐÂY: Thêm "currentUser.roles &&" để kiểm tra an toàn
    isAdmin: currentUser && currentUser.roles && currentUser.roles.includes('ROLE_ADMIN'),
    isUser: currentUser && currentUser.roles && currentUser.roles.includes('ROLE_USER'),
  };

  // Chỉ render children khi đã kiểm tra xong (tránh lỗi FOUC)
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 7. Tạo hook tùy chỉnh (useAuth) để dễ dàng sử dụng
export const useAuth = () => {
  return useContext(AuthContext);
};
