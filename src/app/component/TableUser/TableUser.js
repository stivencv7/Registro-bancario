import React, { useEffect, useState } from 'react'
import { getLikeNombre, getUsuarios } from '../../service/ServiceUsuario/ServiceUsuario';
import { BtnEliminar } from '../../ui/BtnEliminar/BtnEliminar';
import { IoPlayForward } from "react-icons/io5";
import { IoPlayBack } from "react-icons/io5";
import { DialogMultiparFile } from '../DialogMultiparFile/DialogMultiparFile';
import { Link, useNavigate } from 'react-router-dom';
import { GrUpdate } from "react-icons/gr";
import swal from 'sweetalert2'
import AuthService from '../../service/Login/LoginService';
import webSocketService from '../../service/WebSocketService/WebSocketService';

/**
 * Componente TableUser.
 * Este componente muestra una tabla de usuarios con opciones de paginación, búsqueda, actualización y eliminación.
 */
export const TableUser = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [usuario, setUsuario] = useState('');
    const [page, setPage] = useState(0);
    const [numeroPaginas, setNumeroPagina] = useState(0);
    const [searchNombre, setSearchNombre] = useState('');
    const [mensaje, setMensaje] = useState('');


    let navigate = useNavigate();

    // Función para obtener y actualizar la lista de usuarios
    const fetchData = async () => {
        try {
            let usersData = await getUsuarios(page);
            setUsuarios(usersData.content);
            setNumeroPagina(usersData.totalPages)
        } catch (error) {
            swal("Error", error+" 3", "error")
        }
    };

    // Función para ir a la página siguiente
    const siguiente = async () => {
        try {
            setPage(page + 1);
            let usersData = await getUsuarios(page + 1);
            setUsuarios(usersData.content);
        } catch (error) {
            swal("", error+" 4", "error")
        }

    };

    // Función para ir a la página anterior
    const atrasPagina = async () => {
        try {
            setPage(page - 1)
            let usersData = await getUsuarios(page - 1);
            setUsuario(usersData.content);
        } catch (error) {
            swal("", error+" 6", "error")
        }

    }

    // Obtener la lista de usuarios al cargar el componente
    useEffect(() => {

        webSocketService.connect()

        fetchData();

        let info = AuthService.getUserInfo();

        if (info?.sub) {
            setUsuario(info?.sub)
        }

        


        webSocketService.messagesSubject.asObservable().subscribe(m => {
           fetchData();
        })

        return () => {
            // Desconectar el WebSocket cuando el componente se desmonta
            webSocketService.disconnect();

        };

    }, [])

    // Manejar la búsqueda por nombre
    const handleSearchNombre = async (e) => {
        setSearchNombre(e.target.value)

        try {
            if (searchNombre.length >= 2) {
                // Realizar la búsqueda solo si la longitud es al menos tres letras
                let usersData = await getLikeNombre(0, searchNombre);
                setNumeroPagina(usersData.totalPages);
                setUsuarios(usersData.content);
                setMensaje('')
                if (usersData.content == 0) {
                    setMensaje("No hay registros")
                }
            } else {
                // Limpiar resultados si la longitud es menor a tres letras
                setMensaje('')
                fetchData()

            }
        } catch (error) {
            swal("", error+" 7", "error")
        }
    };

    return (
        <main className='div-main max-sm:w-full ' >
            <div className='card size max-sm:w-full' >
                <section className='card-header flex bg-black  items-center gap-[20px] w-auto'>
                    <div>
                        <DialogMultiparFile actualizarUsuarios={fetchData} stile='btn link-li'></DialogMultiparFile>
                    </div>
                    <div>
                        <input className='form-control' type='text' name='nombre' value={searchNombre} onChange={handleSearchNombre} ></input>
                    </div>
                </section>

                <section className='card body table-responsive-sm'>
                    <table className='table table-dark table-hover max-sm:table-sm  font-bold text-center max-sm:w-full flex-wrap'>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Telefono</th>
                                <th>correo</th>
                                <th># cuenta</th>
                                <th>saldo</th>
                                <th>Actualizar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>

                            {usuarios.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.apellido}</td>
                                    <td>{user.telefono}</td>
                                    <td>{user.email}</td>
                                    <td>{user.numeroCuenta}</td>
                                    <td>{user.saldo}</td>
                                    <td><button className='btn'><Link className='text-white' to={`/form/${user.id}`}><GrUpdate className='text-[#2c5778]' /></Link></button></td>
                                    <td><BtnEliminar userId={user.id} usuario={usuario} onDelete={fetchData} ></BtnEliminar></td>

                                </tr>
                            ))}

                        </tbody>
                    </table >
                    {mensaje ?
                        <div className='alert alert-warning text-center ' >
                            <h4>{mensaje}</h4>
                        </div>
                        : ''
                    }
                </section>
                <section className='flex gap-[5px] justify-center bg-black font-bold'>
                    <div>
                        <button className='btn  border-0  text-white' type='button' onClick={atrasPagina} disabled={page <= 0}><IoPlayBack /></button>
                    </div>

                    <div>
                        <button className='btn border-0 text-white' type='button' onClick={siguiente} disabled={page == (numeroPaginas - 1)}><IoPlayForward /></button>
                    </div>
                </section>
            </div>
        </main>
    );
}