import React, { useEffect, useState} from 'react'
import { TablaHistorial } from '../../component/TablaHistorial/TablaHistorial'
import { SidebarMenu } from '../../component/Sidebar/SidebarMenu'
import { getHistoria } from '../../service/ServiceUsuario/ServiceUsuario'
import { useNavigate, useParams, } from 'react-router-dom';
import swal from 'sweetalert2'
export const HistorialPage = () => {

    const [historial, setHistorial] = useState()
    const { id } = useParams();
    
    useEffect(()=>{
        const getHistorial = async () => {
            try {
                let historias = await getHistoria(id);
                setHistorial(historias);
            } catch (error) {
                swal("", error + " 1", "error")
            }
        }
        getHistorial();
    },[])
    return (
        <div className='px-10'>
            <div className='w-40 py-4 pl-[100px] max-sm:w-10 max-sm:pl-0 max-sm:max-sm:absolute max-sm:-top-4 max-sm:right-4 max-sm:z-[5000px] '>
                <SidebarMenu />
            </div>
            <div className='py-3'>
            <TablaHistorial historial={historial}></TablaHistorial>
            </div>
           
        </div>
    )
}
