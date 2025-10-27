import api from './api';

// === Public APIs ===
// (Lấy từ /api/public)
const getPublicTables = () => {
  return api.get('/public/tables');
};

const getPublicMenu = () => {
  return api.get('/public/menu');
};

// === User APIs ===
// (Lấy từ /api/user)
const createBooking = (bookingData) => {
  // bookingData = { tableId: "...", items: [{ productId: "...", quantity: 2 }] }
  return api.post('/user/orders', bookingData);
};

const UserService = {
  getPublicTables,
  getPublicMenu,
  createBooking,
};

export default UserService;