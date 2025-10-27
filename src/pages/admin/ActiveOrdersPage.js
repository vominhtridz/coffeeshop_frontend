import React, { useState, useEffect } from 'react';
import AdminService from '../../services/admin.service';
import { toast } from 'react-toastify';
import './Admin.css';
import './ActiveOrdersPage.css';

const ActiveOrdersPage = () => {
  const [activeOrders, setActiveOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActiveOrders = async () => {
    setLoading(true);
    try {
      // API này lấy các Order có status 'PENDING'
      const res = await AdminService.getActiveOrders();
      setActiveOrders(res.data);
    } catch (error) {
      toast.error('Lỗi khi tải danh sách order');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveOrders();
  }, []);

  // Hàm xử lý khi Admin nhấn "Thanh Toán"
  const handlePay = async (tableId) => {
    try {
      await AdminService.updateTableStatus(tableId, 'PAID');
      toast.success('Đã cập nhật trạng thái: ĐÃ THANH TOÁN');
      fetchActiveOrders(); // Tải lại danh sách
    } catch (error) {
      toast.error('Lỗi khi cập nhật trạng thái');
    }
  };

  // (Tùy chọn) Admin cũng có thể dọn bàn từ trang này
  // Bạn nên làm thêm 1 trang "Bàn đã thanh toán"
  // Tuy nhiên, theo yêu cầu, Admin có thể cập nhật trạng thái,
  // nên ta có thể thêm nút "Dọn Bàn" (PAID -> AVAILABLE)
  // Nhưng hiện tại trang này chỉ hiện bàn OCCUPIED,
  // nên nút "Dọn Bàn" sẽ ở trang Quản lý Bàn (Bước 8.7)

  if (loading) {
    return <div className="admin-container"><h1>Đang tải...</h1></div>;
  }

  return (
    <div className="admin-container">
      <h1>Các Bàn Đang Có Khách (Occupied)</h1>
      {activeOrders.length === 0 ? (
        <p>Hiện không có bàn nào đang hoạt động.</p>
      ) : (
        <div className="order-grid">
          {activeOrders.map((order) => (
            <div key={order.id} className="order-card admin-card">
              <h3>{order.table.tableNumber}</h3>
              <ul className="order-item-list">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.productName} <span>x {item.quantity}</span>
                  </li>
                ))}
              </ul>
              <hr />
              <div className="order-total">
                <strong>Tổng cộng: {order.totalPrice.toLocaleString()} VNĐ</strong>
              </div>
              <button
                className="admin-button pay-button"
                onClick={() => handlePay(order.table.id)}
              >
                Thanh Toán
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveOrdersPage;