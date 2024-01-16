import React from 'react'
import { FormRegisterUser } from '../../component/FormRegisterUser/FormRegisterUser'
import { SidebarMenu } from '../../component/Sidebar/SidebarMenu'



export const Formulario = () => {

    return (
        <div className='flex gap-[60px]'>
            <div className='w-40 py-4 pl-[100px]'>
                <SidebarMenu />
            </div>
            <FormRegisterUser />
        </div>
    )
}
