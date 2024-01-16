import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import './App.css';

import { Route, Routes } from "react-router-dom";
import { Formulario } from './app/page/Formulario/Formulario';
import { LoginPage } from './app/page/LonginPage/LoginPage';
import { TablaPage } from './app/page/TablaPage/TablaPage';
import { UsuarioPage } from './app/page/UsuarioPage/UsuarioPage';

import { ProtectedRoute, ProtectedRouteToken, ProtectedRouteUser } from './app/component/utils/ProtecteRoutedRoute';
import webSocketService from './app/service/WebSocketService/WebSocketService';
import { useEffect, useState } from 'react';
import AuthService from './app/service/Login/LoginService';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import sweealert from 'sweetalert2'


function App() {

  const [message, setMessage] = useState(false);

  useEffect(() => {
    
    webSocketService.connect();

    const messagesSubscription = webSocketService.messagesSubject
      .asObservable()
      .subscribe(handleWebSocketMessage);

    return () => {
      messagesSubscription.unsubscribe();
      webSocketService.disconnect();
    }
    
  },[]);

  const handleWebSocketMessage = (m) => {
    let info = AuthService.getUserInfo();
    try {
      if (m?.username === info?.sub) {
        setMessage(m?.message)
      }
    } catch (error) {
      // Manejar errores aquí si es necesario
    }
  };

  return (
   
    <div className="flex" >

      <ToastContainer>
      {toast.warning(message)}
      </ToastContainer>

     

      <div style="w-full">


        <Routes>
          <Route element={<ProtectedRouteToken/>}>
          <Route path="/" element={<LoginPage />} />
          </Route>
          <Route path='*' element={<>NOT FOUND</>} />
          <Route path="/form/:id?" element={<Formulario />} />
          <Route path="/home/user" element={<UsuarioPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/tabla" element={<TablaPage />} />
          </Route>

          <Route element={<ProtectedRouteUser />}>

          </Route>

        </Routes>


      </div>
     
    </div >
  );
}

export default App;
