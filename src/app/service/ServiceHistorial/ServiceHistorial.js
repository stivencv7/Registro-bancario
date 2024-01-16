import { userApi } from "../../api/UserApi"

export const saveHistorial=async(id,historial)=>{
    try{
        const response=await userApi.post(`/add/historial/${id}`,historial);
        return response.data;
    }catch(error){
        throw error
    }
}