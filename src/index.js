import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

// Import CSS cho Toastify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// (Tùy chọn) Thêm 1 file CSS global
// import './assets/css/global.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Bọc toàn bộ ứng dụng bằng BrowserRouter */}
    <BrowserRouter>
      {/* Bọc ứng dụng bằng AuthProvider */}
      <AuthProvider>
        <App />
        {/* Thêm component ToastContainer ở đây */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);