import { userApi } from "../../api/UserApi"
import Usuario from "../../models/Usuario";
import sweealer from 'sweetalert2'


//enpoid que trae una lista pageable de usuarios
export const getUsuarios = async (page) => {
  try{
    const response = await userApi.get(`/findAll/pageable?page=${page}`)
    return response.data;
  }catch(error){
    throw error;
  }
  
}

export const getHistoria = async (idUser) => {
 
  try{
    const response = await userApi.get(`/get/historial/${idUser}`)
    console.log(response.data)
    return response.data;
  }catch(error){
    throw error;
  }
  
}

//enpoid que busca por nombre 
export const getLikeNombre = async (page, nombre) => {
  try{
    const response = await userApi.get(`/findAll/pageable/searchTerm?page=${page}&searchTerm=${nombre}`)
    return response.data;
  }catch(error){
  
    throw error
    
  }

}

//enpoid que busca por id
export const getUser = async (id) => {
  try{
    const response = await userApi.get(`/search/${id}`);
    return response.data;
  }catch(error){
    throw error;
  }
  
};

//enpoid que busca por id
export const getUserEmail = async (email) => {
  try{
    const response = await userApi.get(`/search/email/${email}`);
    return response.data;
  }catch(error){
    throw error;
  }
  
};

//enpoid que registra usuario
export const createUser = async (userData) => {
  try {
    const response = await userApi.post(`/add`, userData);
    return new Usuario(response.data.id, response.data.name, response.data.email);
  } catch (error) {
   
    throw error;
  }
};

//enpoid que registra un archivo xlsx de usuarios
export const cargaMasiva = async (file) => {
  try {
    const response = await userApi.post(`/multiples/add`, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    return new Usuario(response.data.id, response.data.name, response.data.email);
  } catch (error) {
    throw error
  }
};

//enpoid que elimina usuario 
export const removeUser = async (id,usuario) => {
  try {
    const response = await userApi.delete(`/remove/${id}/${usuario}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//enpoid actualiza usuario
export const updateUser = async (userData) => {
  try {
    const response = await userApi.put(`/set`, userData);
    localStorage.setItem("token",response.data.token)
    
    return new Usuario(response.data.id, response.data.name, response.data.email);

  } catch (error) {
   
    throw error;

  }
};

//enpoid que busca ordenante
export const getUserTransaccion = async (numeroCuenta) => {
  try{
    const response = await userApi.get(`/search/cuenta/${numeroCuenta}`);
    return response.data;
  }catch(error){
    throw error;
  }  
};

//enpoid que realiza la transaccion
export const setTransaccion = async (usuario, cuenta, monto) => {
  try {
    const response = await userApi.put(`/set/transaccion/${cuenta}/${monto}`, usuario);
    return response.data.mensaje;
  } catch (error) {
    throw error
  }
};

