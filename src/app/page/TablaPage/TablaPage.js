import React from 'react'
import { Menu } from '../../component/Menu/Menu'
import {TableUser}from '../../component/TableUser/TableUser'
import { SidebarMenu } from '../../component/Sidebar/SidebarMenu'

export const TablaPage = ({llamad1}) => {
    return (
        <div className='flex gap-[60px] max-sm:flex-col max-sm:gap-0 h-full'>
            <div className='w-40 py-4 pl-[100px] max-sm:w-full max-sm:pl-0 max-sm:flex max-sm:justify-end max-sm:pr-11'>
            <SidebarMenu label={'menu'}/>
            </div>
            
            <TableUser llamada={llamad1}></TableUser>
        </div>
    )
}
