import React from 'react'
import { Menu } from '../../component/Menu/Menu'
import {TableUser}from '../../component/TableUser/TableUser'
import { SidebarMenu } from '../../component/Sidebar/SidebarMenu'

export const TablaPage = () => {
    return (
        <div className='flex gap-[60px] max-sm:flex-col max-sm:gap-0 '>
            <div className='w-40 py-4 pl-[100px] max-sm:w-0 max-sm:pl-0'>
            <SidebarMenu label={'menu'}/>
            </div>
            
            <TableUser></TableUser>
        </div>
    )
}
