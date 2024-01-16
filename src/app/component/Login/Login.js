import React, { useState } from 'react';
import AuthService, { login } from '../../service/Login/LoginService';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2'

export const Login = ({ onLoginSuccess }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleCorreoChange = (e) => {
        setUsername(e.target.value);
    };

    const navigate = useNavigate();

    const handleContraseñaChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        try {
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
    };

    return (
        <div className='w-[70%]  max-sm:w-[80%]'>
            <form className='flex flex-col gap-[10px] max-sm:gap-4 w-full '>
                <div>
                    <input className='form-control max-sm:h-[50px]' name='username' value={username} onChange={handleCorreoChange} placeholder='username'></input>
                </div>

                <div >
                    <input className='form-control max-sm:h-[50px]' type='password' name='password' value={password} onChange={handleContraseñaChange} placeholder='password'></input>
                </div>
                <div>
                    <button className='btn btn-primary w-full max-sm:h-[50px]' type='button' onClick={handleLogin}>Iniciar sesión</button>
                </div>
            </form>

        </div>
    )
}
