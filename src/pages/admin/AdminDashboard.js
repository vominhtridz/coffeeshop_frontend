import React, { useState, useEffect } from 'react';
import AdminService from '../../services/admin.service';
import { toast } from 'react-toastify';
import './Admin.css'; // Dùng CSS chung
import './AdminDashboard.css'; // CSS riêng cho trang này

const AdminDashboard = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const res = await AdminService.getDailyReport();
      setReport(res.data);
    } catch (error) {
      toast.error('Lỗi khi tải báo cáo');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="admin-container"><h1>Đang tải báo cáo...</h1></div>;
  }

  return (
    <div className="admin-container">
      <h1>Dashboard - Báo Cáo Hôm Nay</h1>
      <div className="report-grid">
        <div className="report-card">
          <h2>Tổng Doanh Thu</h2>
          <p>
            {report
              ? report.totalRevenue.toLocaleString()
              : '0'}{' '}
            VNĐ
          </p>
        </div>
        <div className="report-card">
          <h2>Tổng Số Lượt Khách</h2>
          <p>
            {report ? report.totalOrders : '0'} Lượt
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;