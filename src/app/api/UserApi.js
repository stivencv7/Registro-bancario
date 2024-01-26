import axios from "axios";
import { URL_API} from "../consts/variables";
// https://back-registro-bancario-production.up.railway.app/api
//http://localhost:8080/api
export const userApi = axios.create({

  baseURL:'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },

});

userApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


userApi.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa, devolver la respuesta sin cambios
    return response;
  },
  (error) => {
    // Manejar el error de respuesta aquí
    console.error('Error during request:', error);

    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (status === 401) {
        console.error('Error de autenticación:', data.error);
        return Promise.reject('Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.');
      } else if (status === 403) {
        console.error('Error de autorización:', data.error);
        return Promise.reject('No tienes permisos para realizar esta acción.');
      }

      else if (status === 404) {
        console.error('Recurso no encontrado:', data.error);
        return Promise.reject('El recurso solicitado no se encuentra.');
      } else {
        console.error(`Error del servidor (${status}):`, data.error);
        return Promise.reject(`${data.error}`);
      }

    } else if (error.code === 'ECONNABORTED') {
      console.error('Timeout error:', error);
      return Promise.reject('Timeout error');
    } else if (error.message.includes('Network')) {
      console.error('Network error:', error);
      return Promise.reject('No se puede conectar al servidor. Por favor, verifica tu conexión a internet o inténtalo más tarde');
    } else {
      console.error('Otro tipo de error:', error);
      return Promise.reject(error);
    }
  }
);

