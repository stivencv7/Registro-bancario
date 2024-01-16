 import axios from "axios";
 import { jwtDecode as jwt_decode } from "jwt-decode";
import { userApi } from "../../api/UserApi";

const AuthService = {
  
  login: async (credentialData) => {
    try {
      const response = await userApi.post(`/login`, credentialData);
      
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserInfo:() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      return {
        role: decodedToken.role,
        sub: decodedToken.sub,
      };
    }
    return null;
  },

  logout: () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');

  },

  hasAdminRole:() => {
    const userInfo=AuthService.getUserInfo();
    if(userInfo?.role[0] == 'ROLE_ADMIN'){
      return true
    }

    return false;
  },
};
export default AuthService;

