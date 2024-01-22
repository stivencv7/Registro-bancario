import React from 'react'
import { Login } from '../../component/Login/Login'
import{Link, useNavigate} from 'react-router-dom'
import { FaCircleUser } from "react-icons/fa6";
import { TbLock } from "react-icons/tb";

export const LoginPage = ({onLoginSuccess}) => {

  const navigate=useNavigate()

  const redirect=()=>{
    navigate('/tabla')
  }

  return (
    <div className='min-h-screen flex items-center max-sm:items-start max-sm:h-[100vh]  justify-center text-white' >
      <div className='w-[27%] max-sm:w-[100%] flex justify-center items-center flex-col rounded-[30px] max-sm:rounded-none shadow-md shadow-[#062863b0]   h-[22em] max-sm:h-[100vh] bg-gradient-to-br from-[#062863] to-[#00000046] to-[69%]    text-center relative border-[1px] border-[#062863] ' >
        
        <div className=''>< TbLock className='text-[100px] p-[7px] absolute -top-10 left-0 max-sm:relative max-sm:top-0  bg-gradient-to-tl from-[#062863] to-[#000000fd] to-[69%]  rounded-[100%]'  /></div>
        
        <Login onLoginSuccess={redirect}/>
       
        <div className='mt-4'>
            <Link className='font-bold text-[#5e83c4] hover:text-white' to={'/form'} >No tienes una cuenta ?</Link>
        </div>
      </div>
    
    </div>
  )
}
