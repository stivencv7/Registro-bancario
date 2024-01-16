import React from 'react'
import { Login } from '../../component/Login/Login'
import{useNavigate} from 'react-router-dom'
import { FaCircleUser } from "react-icons/fa6";


export const LoginPage = ({onLoginSuccess}) => {

  const navigate=useNavigate()

  const redirect=()=>{
    navigate('/tabla')
  }

  return (
    <div className='min-h-screen flex items-center max-sm:items-start max-sm:h-[100vh]  justify-center text-white' >
      <div className='w-[30%] max-sm:w-[100%] flex justify-center items-center flex-col rounded-[6px] h-[30em] max-sm:h-[100vh] bg-[#00000067]  text-center'  >
        
        <div><FaCircleUser className='text-[100px]'/></div>
        <br></br>
        <Login onLoginSuccess={redirect}/>
      </div>
    </div>
  )
}
