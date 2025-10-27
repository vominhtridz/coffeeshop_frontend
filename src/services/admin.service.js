import api from './api';

// Report
const getDailyReport = () => {
  return api.get('/admin/reports/daily');
};

// Products (Menu Management)
const getProducts = () => {
  return api.get('/admin/products');
};
const createProduct = (productData) => {
  return api.post('/admin/products', productData);
};
const updateProduct = (id, productData) => {
  return api.put(`/admin/products/${id}`, productData);
};
const deleteProduct = (id) => {
  return api.delete(`/admin/products/${id}`);
};

// Tables (Table Management)
const getTables = () => {
  // Admin cũng có thể dùng API public để xem, nhưng nếu cần API riêng thì tạo
  return api.get('/public/tables'); // Tái sử dụng API public
};
const createTable = (tableData) => {
  // tableData = { tableNumber: "Bàn 10" }
  return api.post('/admin/tables', tableData);
};
const updateTableStatus = (id, status) => {
  // status = "AVAILABLE" | "OCCUPIED" | "PAID"
  return api.put(`/admin/tables/${id}/status`, { status });
};

// Orders (Active Order View)
const getActiveOrders = () => {
  // Lấy các bàn đang OCCUPIED (order status PENDING)
  return api.get('/admin/orders/active');
};

const AdminService = {
  getDailyReport,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getTables,
  createTable,
  updateTableStatus,
  getActiveOrders,
};

export default AdminService;