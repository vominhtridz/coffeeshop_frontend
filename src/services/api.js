import axios from 'axios';

// Lấy token từ localStorage (nếu có)
const user = JSON.parse(localStorage.getItem('user'));
const APIURL =  process.env.REACT_APP_API_URL + '/api' ||'http://localhost:8080/api';
const api = axios.create({
  // URL trỏ đến Backend Spring Boot của bạn
  // Khi chạy bằng Docker Compose, đây sẽ là tên service
  // Nhưng khi dev local, nó là localhost:8080
  baseURL: APIURL,
});

// Cấu hình Interceptor (Bộ chặn request)
// Tự động đính kèm token vào header Authorization cho MỌI request
api.interceptors.request.use(
  (config) => {
    if (user && user.token) {
      config.headers['Authorization'] = 'Bearer ' + user.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;