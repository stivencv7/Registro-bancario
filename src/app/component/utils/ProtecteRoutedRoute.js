import AuthService from "../../service/Login/LoginService"
import {Outlet} from 'react-router-dom';

export const ProtectedRoute=()=>{

    let info=AuthService.getUserInfo()

    if(info?.role=='ROLE_ADMIN'){
        return <Outlet/>
    }

    return (
        <div className="alert alert-info">
            No Autorizado
        </div>
    )

}


export const ProtectedRouteUser=()=>{

    let info=AuthService.getUserInfo()

    if(info?.role=='ROLE_USER'){
        return <Outlet/>
    }

    return (
        <div className="alert alert-info">
            No Autorizado
        </div>
    )

}


export const ProtectedRouteToken=()=>{

    let token=localStorage.getItem("token")

    if(token){
        return (
            <div className="alert alert-info">
                No Autorizado
            </div>
        )       
    }

    return <Outlet/>

}