import React, { useState, useEffect } from 'react';
import UserService from '../../services/user.service';
import { toast } from 'react-toastify';
import './BookingPage.css';

// Component Modal
const BookingModal = ({ table, menu, onClose, onBookingConfirm }) => {
  // State 'cart' chứa các { productId, name, quantity, price }
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === product.id);
      if (existingItem) {
        // Tăng số lượng
        return prevCart.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Thêm mới
        return [
          ...prevCart,
          {
            productId: product.id,
            name: product.name,
            quantity: 1,
            price: product.price,
          },
        ];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === productId);
      if (existingItem.quantity === 1) {
        // Xóa khỏi giỏ hàng
        return prevCart.filter((item) => item.productId !== productId);
      } else {
        // Giảm số lượng
        return prevCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleConfirm = () => {
    if (cart.length === 0) {
      toast.error('Vui lòng chọn ít nhất 1 món');
      return;
    }
    // Format lại data cho API
    const bookingData = {
      tableId: table.id,
      items: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };
    onBookingConfirm(bookingData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Đặt Bàn: {table.tableNumber}</h2>
        
        <div className="modal-body">
          {/* Cột Menu */}
          <div className="menu-list">
            <h3>Menu</h3>
            {menu.map((product) => (
              <div key={product.id} className="menu-item">
                <span>
                  {product.name} - {product.price.toLocaleString()} VNĐ
                </span>
                <button onClick={() => addToCart(product)}>+</button>
              </div>
            ))}
          </div>

          {/* Cột Giỏ Hàng */}
          <div className="cart-list">
            <h3>Đơn Hàng</h3>
            {cart.length === 0 ? (
              <p>Chưa chọn món...</p>
            ) : (
              cart.map((item) => (
                <div key={item.productId} className="cart-item">
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <div>
                    <button onClick={() => removeFromCart(item.productId)}>-</button>
                    <span>{(item.price * item.quantity).toLocaleString()} VNĐ</span>
                  </div>
                </div>
              ))
            )}
            <hr />
            <div className="cart-total">
              <strong>Tổng cộng: {getTotalPrice().toLocaleString()} VNĐ</strong>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="confirm-btn" onClick={handleConfirm}>Xác Nhận Đặt</button>
        </div>
      </div>
    </div>
  );
};


// Component Trang Chính
const BookingPage = () => {
  const [tables, setTables] = useState([]);
  const [menu, setMenu] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tablesRes, menuRes] = await Promise.all([
        UserService.getPublicTables(),
        UserService.getPublicMenu(),
      ]);
      setTables(tablesRes.data);
      setMenu(menuRes.data);
    } catch (error) {
      toast.error('Lỗi khi tải dữ liệu bàn và menu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTableClick = (table) => {
    if (table.status === 'AVAILABLE') {
      setSelectedTable(table);
      setIsModalOpen(true);
    } else {
      toast.info(`Bàn ${table.tableNumber} hiện đang ${table.status}`);
    }
  };

  const handleBookingConfirm = async (bookingData) => {
    try {
        await UserService.createBooking(bookingData);
        toast.success(`Đặt bàn ${selectedTable.tableNumber} thành công!`);
        setIsModalOpen(false);
        setSelectedTable(null);
        fetchData(); // Tải lại danh sách bàn
    } catch (error) {
        const errMsg = error.response?.data?.message || 'Lỗi khi đặt bàn';
        toast.error(errMsg);
    }
  };

  if (loading) {
    return <div className="loading-container">Đang tải dữ liệu bàn...</div>;
  }

  return (
    <div className="booking-container">
      <h1>Chọn Bàn Để Đặt</h1>
      <div className="legend">
        <span className="legend-item"><div className="dot available"></div> Trống</span>
        <span className="legend-item"><div className="dot occupied"></div> Đã có khách</span>
        <span className="legend-item"><div className="dot paid"></div> Đã thanh toán</span>
      </div>

      {/* Hiển thị danh sách bàn */}
      <div className="table-grid">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`table-card ${table.status.toLowerCase()}`}
            onClick={() => handleTableClick(table)}
          >
            {table.tableNumber}
          </div>
        ))}
      </div>

      {/* Modal Đặt Bàn */}
      {isModalOpen && (
        <BookingModal
          table={selectedTable}
          menu={menu}
          onClose={() => setIsModalOpen(false)}
          onBookingConfirm={handleBookingConfirm}
        />
      )}
    </div>
  );
};

export default BookingPage;