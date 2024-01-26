import React, { useState } from 'react';
import AuthService, { login } from '../../service/Login/LoginService';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2'
import { FaSpinner } from 'react-icons/fa6';
import { Button } from '../../share/Button';
import { Spinner } from '../../share/Spinner';
import { FaUser } from "react-icons/fa";
import { InputPassword } from '../../share/InputPassword';
// import { FaEye } from "react-icons/fa6";
// import { FaEyeSlash } from "react-icons/fa6";

export const Login = ({ onLoginSuccess }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading,setLoading]=useState(false)
    const [visible,setVisible]=useState(false)
    // const [type,setType]=useState('password')
    

    const handleCorreoChange = (e) => {
        setUsername(e.target.value);
    };

    const navigate = useNavigate();

    const handleContraseñaChange = (e) => {
        setPassword(e.target.value);
    };

    // const handleType=()=>{
    //     if(type=='password'){
    //         setType('text')
    //     }else{
    //         setType('password')
    //     }
    // }

    const handleLogin = async () => {
        try {

            
            setLoading(true)
          

            const credentials = { username: username, password: password };
            const loginResponse = await AuthService.login(credentials);
            console.log('Login successful:', loginResponse);
            
           

            // Obtener información del usuario después del inicio de sesión
            const userInfo = AuthService.getUserInfo();

            if (userInfo.role[0] == 'ROLE_ADMIN') {

                onLoginSuccess()
                // Llamamos a la función de redirección pasada como prop

            } else if (userInfo.role[0] == 'ROLE_USER') {
                navigate('/home/user')
                // Redirigir a la página correspondiente para usuarios no admin

            }
        } catch (error) {
            console.error('Error during login:', error);
            swal("",error, "error")
        }
        setLoading(false)
    };

    return (
        <div className='w-[70%]  max-sm:w-[80%] max-sm:h-[45%] mt-[50px] h-[55%]'>
            {loading && <Spinner/>}
            <form className='flex flex-col gap-[36px] max-sm:gap-[36px] w-full h-full '>
                <div className='relative'>
                    <input className='max-sm:h-[50px] border-b-[1px] bg-transparent border-b-[#d00034] pl-8 focus-visible:outline-none flex h-[40px] w-full items-center text-[white]'  name='username' value={username} onChange={handleCorreoChange} placeholder='username'></input>
                    <FaUser className='z-50 absolute left-0 bottom-0 mb-2   text-[#d00034] text-[24px] pl-1 mr-50'/>
                    
                </div>

                
                    <InputPassword className=' border-b-[1px] bg-transparent border-b-[#d00034] focus-visible:outline-none flex h-[40px] w-full items-center  max-sm:h-[50px]  pl-8  text-[white]' name='password' value={password} onChange={handleContraseñaChange} placeholder={'password'}/>
             

                <div className='h-[45px] relative  mt-2' >
                    <Button type='button' onClick={handleLogin} text={'Iniciar sesión'}/>
                </div>
                
            </form>

        </div>
    )
}
