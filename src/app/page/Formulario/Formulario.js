import React from 'react'
import { FormRegisterUser } from '../../component/FormRegisterUser/FormRegisterUser'
import { SidebarMenu } from '../../component/Sidebar/SidebarMenu'



export const Formulario = () => {

    return (
        <div className='flex gap-[60px] max-sm:gap-0 max-sm:flex-col max-sm:justify-start  max-sm:relative  '>
            <div className='w-40 py-4 pl-[100px] max-sm:w-10 max-sm:pl-0 max-sm:max-sm:absolute max-sm:-top-4 max-sm:right-0 max-sm:z-[5000px]'>
                <SidebarMenu />
            </div>
            <FormRegisterUser />
        </div>
    )
}
