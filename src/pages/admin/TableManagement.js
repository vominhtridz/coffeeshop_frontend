import React, { useState, useEffect } from 'react';
import AdminService from '../../services/admin.service';
import { toast } from 'react-toastify';
import './Admin.css';
import './TableManagement.css'; // CSS riêng

const TableManagement = () => {
  const [tables, setTables] = useState([]);
  const [tableNumber, setTableNumber] = useState(''); // State cho form
  const [loading, setLoading] = useState(true);

  const fetchTables = async () => {
    setLoading(true);
    try {
      const res = await AdminService.getTables();
      setTables(res.data);
    } catch (error) {
      toast.error('Lỗi khi tải danh sách bàn');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  // Xử lý Thêm Bàn
  const handleAddTable = async (e) => {
    e.preventDefault();
    if (!tableNumber) {
      toast.error('Vui lòng nhập số bàn');
      return;
    }
    try {
      await AdminService.createTable({ tableNumber });
      toast.success(`Đã thêm ${tableNumber} thành công`);
      setTableNumber('');
      fetchTables(); // Tải lại
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Lỗi khi thêm bàn';
      toast.error(errMsg);
    }
  };

  // Xử lý Dọn Bàn (PAID -> AVAILABLE)
  const handleClearTable = async (table) => {
    if (table.status !== 'PAID') {
        toast.warn(`Bàn ${table.tableNumber} đang ${table.status}, không thể dọn`);
        return;
    }
    try {
      await AdminService.updateTableStatus(table.id, 'AVAILABLE');
      toast.success(`Đã dọn Bàn ${table.tableNumber}`);
      fetchTables(); // Tải lại
    } catch (error) {
      toast.error('Lỗi khi dọn bàn');
    }
  };

  return (
    <div className="admin-container">
      <h1>Quản Lý Bàn</h1>
      
      {/* Form Thêm Bàn */}
      <div className="admin-card">
        <h2>Thêm Bàn Mới</h2>
        <form className="admin-form" onSubmit={handleAddTable}>
          <div className="form-group">
            <label htmlFor="tableNumber">Số Bàn (Ví dụ: "Bàn 1", "VIP 2")</label>
            <input
              type="text"
              id="tableNumber"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="Nhập số bàn..."
            />
          </div>
          <button type="submit" className="admin-button">Thêm Bàn</button>
        </form>
      </div>

      {/* Danh sách Bàn Hiện Có */}
      <div className="admin-card">
        <h2>Danh Sách Bàn Hiện Có</h2>
        <div className="table-manage-grid">
          {tables.map((table) => (
            <div key={table.id} className={`table-manage-card ${table.status.toLowerCase()}`}>
              <span className="table-manage-number">{table.tableNumber}</span>
              <span className="table-manage-status">{table.status}</span>
              {table.status === 'PAID' && (
                <button
                  className="admin-button clear-button"
                  onClick={() => handleClearTable(table)}
                >
                  Dọn Bàn
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableManagement;