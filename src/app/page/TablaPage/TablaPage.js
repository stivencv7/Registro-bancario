import React from 'react'
import { Menu } from '../../component/Menu/Menu'
import {TableUser}from '../../component/TableUser/TableUser'
import { SidebarMenu } from '../../component/Sidebar/SidebarMenu'

export const TablaPage = () => {
    return (
        <div className='flex gap-[60px]'>
            <div className='w-40 py-4 pl-[100px]'>
            <SidebarMenu label={'menu'}/>
            </div>
            
            <TableUser></TableUser>
        </div>
    )
}
