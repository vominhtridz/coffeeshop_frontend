import React, { useState, useEffect } from 'react';
import AdminService from '../../services/admin.service';
import { toast } from 'react-toastify';
import './Admin.css';

const MenuManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // State cho form
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // Dùng cho việc Sửa
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await AdminService.getProducts();
      setProducts(res.data);
    } catch (error) {
      toast.error('Lỗi khi tải menu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setIsEditing(false);
    setCurrentProduct(null);
    setName('');
    setPrice(0);
    setDescription('');
  };

  // Xử lý Thêm / Sửa
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, price: parseFloat(price), description };
    try {
      if (isEditing) {
        // Cập nhật
        await AdminService.updateProduct(currentProduct.id, productData);
        toast.success('Cập nhật món thành công');
      } else {
        // Thêm mới
        await AdminService.createProduct(productData);
        toast.success('Thêm món mới thành công');
      }
      resetForm();
      fetchProducts();
    } catch (error) {
      toast.error('Có lỗi xảy ra');
    }
  };

  // Xử lý khi nhấn nút Sửa
  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
  };

  // Xử lý Xóa
  const handleDelete = async (productId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa món này?')) {
      try {
        await AdminService.deleteProduct(productId);
        toast.success('Xóa món thành công');
        fetchProducts();
        if (currentProduct && currentProduct.id === productId) {
            resetForm(); // Reset form nếu đang sửa món bị xóa
        }
      } catch (error) {
        toast.error('Lỗi khi xóa món');
      }
    }
  };

  return (
    <div className="admin-container">
      <h1>Quản Lý Menu (Master Data)</h1>

      {/* Form Thêm/Sửa */}
      <div className="admin-card">
        <h2>{isEditing ? 'Cập Nhật Món Ăn' : 'Thêm Món Ăn Mới'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="admin-form">
            <div className="form-group">
              <label>Tên Món</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Giá (VNĐ)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0"
              />
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>Mô tả</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="admin-button">
            {isEditing ? 'Cập Nhật' : 'Thêm Mới'}
          </button>
          {isEditing && (
            <button
              type="button"
              className="admin-button-secondary"
              onClick={resetForm}
              style={{ marginLeft: '1rem' }}
            >
              Hủy
            </button>
          )}
        </form>
      </div>

      {/* Bảng Danh Sách Món Ăn */}
      <div className="admin-card">
        <h2>Danh Sách Món Ăn</h2>
        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Tên Món</th>
                <th>Giá</th>
                <th>Mô Tả</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price.toLocaleString()} VNĐ</td>
                  <td>{product.description}</td>
                  <td>
                    <button
                      className="admin-button-secondary"
                      onClick={() => handleEdit(product)}
                      style={{ marginRight: '0.5rem' }}
                    >
                      Sửa
                    </button>
                    <button
                      className="admin-button-danger"
                      onClick={() => handleDelete(product.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MenuManagement;