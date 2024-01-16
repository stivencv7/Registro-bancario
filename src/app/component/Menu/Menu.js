import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../../service/Login/LoginService';
/**
 * componentes para manejar las rutas
 */
export const Menu = () => {

  const [token,setToken]=useState('')
  const navigate=useNavigate();

  const cerraSesion=()=>{
    AuthService.logout();
    navigate('/')
  }

  useEffect(()=>{
    setToken(localStorage.getItem('token'))
  },[])
  return (
    <ul className='w-[100%] flex flex-col gap-[11px] items-center justify-center'> 
      <Link className='text-white bg-[#2c5778] w-full text-center rounded-[4px] py-[6px] no-underline' to={'/form'}>Registra Usarios</Link>
      <Link className='text-white bg-[#2c5778] w-full text-center rounded-[4px] py-[6px] no-underline' to={'/tabla'}>Lista Usuarios</Link>
      <Link className='text-white bg-[#2c5778] w-full text-center rounded-[4px] py-[6px] no-underline' to={'/home/user'}>Transacción</Link>
    </ul>
    
  )
}
