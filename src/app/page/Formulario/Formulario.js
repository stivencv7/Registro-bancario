import React from 'react'
import { FormRegisterUser } from '../../component/FormRegisterUser/FormRegisterUser'
import { SidebarMenu } from '../../component/Sidebar/SidebarMenu'



export const Formulario = () => {

    return (
        <div style={{ display: 'flex', gap: '60px'}}>
            <div className='w-40 py-4' style={{ paddingLeft: '100px' }}>
                <SidebarMenu />
            </div>
            <FormRegisterUser />
        </div>
    )
}
