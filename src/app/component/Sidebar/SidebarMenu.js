import React, { useEffect, useState } from 'react'
import { Sidebar } from 'primereact/sidebar';
import AuthService from '../../service/Login/LoginService';
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from '../Menu/Menu';
import { IoSettings } from "react-icons/io5";

export const SidebarMenu = ({ label, id }) => {

    const [rol, setROl] = useState('')

    let navigate = useNavigate()

    const [visible, setVisible] = useState(false);

    const logout = () => {
        AuthService.logout();
        navigate('/')
    }

    useEffect(() => {
        let info = AuthService.getUserInfo();
        setROl(info?.role);
    }, [])

    return (
        <>
            <Sidebar visible={visible} onHide={() => setVisible(false)} className='bg-[#000000a9]'>
                <div className='flex items-center justify-center flex-col gap-3 bg-red'>
                    {rol == 'ROLE_ADMIN' ?
                        <Menu />
                        :
                        <div className='w-full flex flex-col gap-3 justify-center items-center mt-2 '>
                            <div className='text-center w-full flex flex-col gap-2'>
                                <button className='text-white bg-[#2c5778] w-full text-center rounded-[4px] py-[6px] no-underline'><Link className='w-full px-10  text-white p-30 font-bold no-underline' to={`/home/user`} >Transacciones</Link></button>
                                <button className='text-white bg-[#2c5778] w-full text-center rounded-[4px] py-[6px] no-underline'><Link className='w-full px-10 text-white p-30 font-bold no-underline' to={`/form/${id}`}>Actualizar datos</Link></button>
                            </div>
                        </div>
                    }
                    <div className='w-full'>
                        <button className='btn btn-primary w-full' onClick={logout}>Cerrar Sesión</button>
                    </div>
                </div>
            </Sidebar>

            <button onClick={() => setVisible(true)}><IoSettings className="rollingButton text-[30px]"  /></button>
        </>
    )
}
