import React, { useEffect, useState } from 'react'
import { createUser, getUser, updateUser } from '../../service/ServiceUsuario/ServiceUsuario';
import { useNavigate, useParams, } from 'react-router-dom';
import { useFormik } from 'formik';
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegCreditCard } from "react-icons/fa";
import swal from 'sweetalert2'
import * as Yup from 'yup';
import Usuario from '../../models/Usuario';
import AuthService from '../../service/Login/LoginService';
import { ToastContainer,toast } from 'react-toastify';

/**
 * Componente FormRegisterUser.
 * Este componente maneja el registro y actualización de usuarios a través de un formulario.
 * Utiliza la biblioteca Formik para gestionar el estado del formulario y realizar la validación.
 */
export const FormRegisterUser = () => {

  const [userId, setUserId] = useState();
  const [validarContraseña, setValidarContraseña] = useState('');
  const [statusRegister, setStatusRgister] = useState(false);


  // Variables y funciones para la navegación y obtención de parámetros de la URL
  let usuario = null;
  let navigate = useNavigate();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      telefono: '',
      correo: '',
      contrasenia: '',
      numeroCuenta: '',
      saldo: '',
    },
    //Configuaracion de los mensajes de error
    validationSchema: Yup.object({
      nombre: Yup.string().required('Campo obligatorio'),
      apellido: Yup.string().required('Campo obligatorio'),
      telefono: Yup.string().length(10, 'Verifique el numero').required('Campo obligatorio'),
      correo: Yup.string().email('Ingrese un correo valido').required('Campo obligatorio'),
      contrasenia: Yup.string().required('Campo obligatorio')
        .matches(
          /^[a-zA-Z\d]{4,8}$/,
          'entre 4 a 8 caracteres'
        ),
      saldo: Yup.number().positive('El saldo debe ser numero positivo ').required('Campo obligatorio'),
    }),

  });

  // Funcion para nanejar el estado del validador de contraseña
  const handleValidarContraseña = (e) => {
    setValidarContraseña(e.target.value)
  }

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {

    setStatusRgister(true);//Esta acción hace que el btn registrar quede en  disabled 

    e.preventDefault();
    // Obtén los valores del formulario utilizando Formik
    const { nombre, apellido, telefono, correo, contrasenia, numeroCuenta, saldo } = formik.values;

    if (id) {
      const newUser = new Usuario(userId, nombre, apellido, telefono, correo, contrasenia, numeroCuenta, saldo);
      try {
        await updateUser(newUser)
        toast.success("Usuario con el id " + id + " actualizado")
        let info = AuthService.getUserInfo();

        if (info?.role == 'ROLE_ADMIN') {
          navigate("/tabla")
        } else {
          navigate('/home/user')
        }

      } catch (error) {
        swal("", error, "error")
      }

    } else {
      if (formik.values.contrasenia == validarContraseña) {
        const newUser = new Usuario(null, nombre, apellido, telefono, correo, contrasenia, numeroCuenta, saldo);
        try {
          await createUser(newUser);
          toast.success("Usuario registrado con exito")
        } catch (error) {
          swal("", error, "error")
        }
        navigate("/tabla")
      } else {
        setStatusRgister(false)
        swal("", "La contraseña no coinciden", "error");
      }
    }
    // Navegar de nuevo a la página principal

  };

  // Efecto secundario al montar el componente para obtener información del usuario en modo de actualización
  useEffect(() => {


    if (id) {
      const getUsuario = async (id) => {
        try {
          usuario = await getUser(id);
          const newValues = {
            nombre: usuario.username,
            apellido: usuario.apellido,
            telefono: usuario.telefono,
            correo: usuario.email,
            contrasenia: usuario.password,
            numeroCuenta: usuario.numeroCuenta,
            saldo: usuario.saldo,
          };
          if (usuario) {
            setUserId(id)
            formik.setValues(newValues);
          }
        } catch (error) {
          swal(error, "", 'error')
        }
      }
      getUsuario(id);
    }

  }, [])

  return (
    <main className='div-main max-sm:w-full max-sm:items-start max-sm:pt-0 max-sm: max-sm:h-full ' >
      <form className='flex flex-col max-sm:gap-[20px] gap-[25px] w-[50%] h-[90vh]  bg-black  bg-opacity-50 p-2 rounded-xl max-sm:rounded-[0px] max-sm:w-full max-sm:h-full' onSubmit={handleSubmit}>

        {id ? <div><h2 className='text-white flex items-center gap-[5px]'><FaRegUserCircle />Actualiza información</h2></div> : <div> <h2 className='text-white flex items-center gap-[5px] '><FaRegUserCircle /> Informacion Personal</h2></div>}

        <section className='flex max-sm:flex-col max-sm:gap-[30px] gap-[50px] w-full'>
          <div className='relative w-[100%] '>

            <input className='form-control input' type="text" name='nombre' onChange={formik.handleChange} value={formik.values.nombre} onBlur={formik.handleBlur} placeholder='Nombre' required />
            {formik.touched.nombre && <span className='absolute text-white font-bold'>{formik.errors.nombre}</span>}
          </div>

          <div className='relative w-[100%]'>
            <input className='form-control input' type="text" name='apellido' onChange={formik.handleChange} value={formik.values.apellido} onBlur={formik.handleBlur} placeholder='Apellido' required />
            {formik.touched.apellido && <span className='absolute  text-white font-bold'>{formik.errors.apellido}</span>}
          </div>
        </section>

        <section className='flex max-sm:flex-col max-sm:gap-[30px] gap-[50px] w-full'>

          <div className='relative w-[100%]'>

            <input className='form-control input' type="number" name='telefono' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.telefono} placeholder='# Telefonico' minLength='7' maxLength='10' required />
            {formik.touched.telefono && <span className='absolute -bottom-[5.5] text-white font-bold' >{formik.errors.telefono}</span>}
          </div>

          <div className='relative w-[100%]'>
            <input className='form-control input' type="email" name='correo' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.correo} placeholder='Correo' required />
            {formik.touched.correo && <span className='absolute -bottom-5 text-white font-bold' >{formik.errors.correo}</span>}
          </div>

        </section>

        <div>
          <h2 className='text-white flex items-center gap-[5px]'><RiLockPasswordLine /> Seguridad</h2>
        </div>

        <section className='flex max-sm:flex-col max-sm:gap-[30px] gap-[50px] w-full'>

          <div className='relative w-[100%]'>
            <input placeholder='Contraseña' className='form-control input' type="password" name='contrasenia' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.contrasenia} required />
            {formik.touched.contrasenia && <span className='absolute -bottom-5 text-white font-bold' >{formik.errors.contrasenia}</span>}
          </div>

          <div className='relative w-[100%]'>
            <input placeholder='Confirmar-Contraseña' className='form-control input' type="password" name='validarContraseña' onChange={handleValidarContraseña} onBlur={formik.handleBlur} value={validarContraseña} disabled={id} required />
            {formik.touched.contrasenia && <span className='absolute -bottom-5 text-white font-bold' >{formik.errors.contrasenia}</span>}
          </div>

        </section>

        <div>
          <h2 className='text-white flex items-center gap-[5px]'><FaRegCreditCard /> Información Cuenta</h2>
        </div>

        <section className='flex max-sm:flex-col max-sm:gap-[30px] gap-[50px] w-full'>

          <div className='relative w-[100%]'>
            <input placeholder='Nombre-titular' className='form-control input' type="text" name='nombre' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.nombre} disabled required />
            {formik.touched.nombre && <span className='absolute -bottom-5 text-white font-bold' >{formik.errors.nombre}</span>}
          </div>

          <div className='relative w-[100%]'>
            <input placeholder='Saldo' className='form-control input' type="number" name='saldo' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.saldo} required />
            {formik.touched.saldo && <span className='absolute -bottom-5 text-white font-bold'>{formik.errors.saldo}</span>}
          </div>

        </section>

        <div className='btn-registrar pb-20'>
          {id ? <button className='btn btn-primary  w-[100%]' type="submit">Actualizar</button>
            : <button  className='btn btn-primary w-[100%]' type="submit" disabled={!formik.isValid || statusRegister}>Registrar</button>
          }
        </div>
      </form>

    </main>
  )
}