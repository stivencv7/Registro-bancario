import React from 'react'
import { Login } from '../../component/Login/Login'
import { Link, useNavigate } from 'react-router-dom'
import { FaCircleUser } from "react-icons/fa6";
import { TbLock } from "react-icons/tb";

export const LoginPage = ({ onLoginSuccess }) => {

  const navigate = useNavigate()

  const redirect = () => {
    navigate('/tabla')
  }

  return (
    <div className='min-h-screen flex items-center max-sm:items-start max-sm:h-[100vh]  justify-center text-white' >
      <div className='w-[27%] max-sm:w-[100%] flex justify-center items-center flex-col rounded-[30px] max-sm:rounded-none shadow-shadowperf  h-[30em] max-sm:h-[100vh] bg-[#1a1a1a] bg-gradient-to-br  text-center relative ' >

        <div className=''>< TbLock className='text-[90px] text-[] p-[7px] absolute -top-10 left-0 max-sm:relative max-sm:top-0' /></div>

        <Login onLoginSuccess={redirect} />

        <div className=''>
          <Link className='font-bold text-[#5e83c4] hover:text-white' to={'/form'} >No tienes una cuenta ?</Link>
        </div>
      </div>

    </div>
  )
}
