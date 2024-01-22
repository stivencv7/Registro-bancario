import React, { useEffect, useState } from 'react'
import { FormRegisterUser } from '../../component/FormRegisterUser/FormRegisterUser'
import { SidebarMenu } from '../../component/Sidebar/SidebarMenu'
import { Link } from 'react-router-dom';
import { FaCircleArrowLeft } from "react-icons/fa6";



export const Formulario = () => {

    const [token, setToken] = useState();

    useEffect(()=>{
        setToken(localStorage.getItem("token"))
    })

    return (
        <div className='flex gap-[60px] max-sm:gap-0 max-sm:flex-col max-sm:justify-start  max-sm:relative h-[100vh]  '>
            <div className='w-40 py-4 pl-[100px] max-sm:w-10 max-sm:pl-0 max-sm:max-sm:absolute max-sm:-top-4 max-sm:right-0 max-sm:z-[5000px]'>
                {token ?
                    <SidebarMenu />
                    :
                   <Link to={'/'}><FaCircleArrowLeft className='text-[30px] text-[white]  z-50'/></Link> 
                }
            </div>
            <FormRegisterUser />
        </div>
    )
}
