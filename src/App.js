import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import AdminRoute from './utils/AdminRoute';
import Navbar from './components/Navbar';

// --- (Cách nâng cao dùng Lazy Loading) ---
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const BookingPage = lazy(() => import('./pages/user/BookingPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const MenuManagement = lazy(() => import('./pages/admin/MenuManagement'));
const TableManagement = lazy(() => import('./pages/admin/TableManagement'));
const ActiveOrdersPage = lazy(() => import('./pages/admin/ActiveOrdersPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Component Loading (để hiển thị khi chờ lazy load)
const LoadingFallback = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>Đang tải...</div>
);

function App() {
  return (
    <>
    <Navbar />
 <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* === Public Routes === */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* === User Routes (Protected) === */}
        <Route element={<PrivateRoute />}>
          <Route path="/booking" element={<BookingPage />} />
          {/* Thêm các route khác của User ở đây (ví dụ: xem lịch sử đặt) */}
        </Route>
        
        {/* === Admin Routes (Protected) === */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route index element={<AdminDashboard />} /> {/* /admin */}
          <Route path="menu" element={<MenuManagement />} /> {/* /admin/menu */}
          <Route path="tables" element={<TableManagement />} /> {/* /admin/tables */}
          <Route path="orders" element={<ActiveOrdersPage />} /> {/* /admin/orders */}
          {/* Thêm các route admin khác ở đây */}
        </Route>

        {/* === Not Found Route === */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
    </>
   
  );
}

export default App;