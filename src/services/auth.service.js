import api from './api';
import { jwtDecode } from 'jwt-decode'; // Đổi từ jwt-decode

class AuthService {
  
  // Gọi API đăng nhập
  async login(username, password) {
    const response = await api.post('/auth/login', {
      username,
      password,
    });
    
    // Nếu API trả về thành công (có token)
    if (response.data.token) {
      // Lưu thông tin user (bao gồm token) vào localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }

  // Xóa token khỏi localStorage
  logout() {
    localStorage.removeItem('user');
  }

  // Gọi API đăng ký
  signup(username, password) {
    return api.post('/auth/signup', {
      username,
      password,
    });
  }

  // Lấy thông tin user hiện tại từ localStorage
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  // Lấy thông tin đã giải mã từ token (để kiểm tra role)
  getDecodedJwt() {
    const user = this.getCurrentUser();
    if (user && user.token) {
      try {
        // Lấy danh sách roles từ token đã lưu
        // Lưu ý: Backend (JwtResponse) trả về "roles", nên ta lấy "roles"
        const decodedToken = jwtDecode(user.token);
        
        // Cập nhật: JwtResponse của chúng ta trả về roles ở cấp cao nhất
        // nên ta lấy trực tiếp từ user object là đủ.
        // Hàm này có thể dùng để kiểm tra token hết hạn.
        return { 
          roles: user.roles, 
          username: user.username,
          expired: decodedToken.exp * 1000 < Date.now() 
        };
      } catch (error) {
        console.error("Invalid token:", error);
        return null;
      }
    }
    return null;
  }
}

const authService = new AuthService();
export default authService;