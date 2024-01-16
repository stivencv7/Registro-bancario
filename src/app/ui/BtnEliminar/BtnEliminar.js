import React from 'react'
import { removeUser } from '../../service/ServiceUsuario/ServiceUsuario'
import swal from 'sweetalert2';
import { MdDeleteForever } from "react-icons/md";


export const BtnEliminar = ({ userId = 0,usuario,onDelete }) => {

  const deleteUser = async () => {
    try {
      await removeUser(userId,usuario);
      onDelete();
    } catch (error) {
      swal("",error, "error")
    }
  };


  const deleteUsuario = () => {

    swal({
      title: 'Eliminar Usuario',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: '#064edf',
      confirmButtonText: 'Si, eliminar'
    },).then((result) => {
      if (result.value) {
        deleteUser();
      }
    })
  }

  return (
    <button className='btn text-danger' onClick={deleteUsuario} ><MdDeleteForever className='text-[30px]'/></button>
  )
}
