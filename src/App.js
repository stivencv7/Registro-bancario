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
import { TablaHistorial } from './app/component/TablaHistorial/TablaHistorial';
import { HistorialPage } from './app/page/HistorialPage/HistorialPage';



function App() {

  const [message, setMessage] = useState('');

  useEffect(() => {

    webSocketService.connect();

    const messagesSubscription = webSocketService.messagesSubject.asObservable()
      .subscribe(m => {
        let info = AuthService.getUserInfo();
        try {
          if (m?.username === info?.sub) {
            let mensaje = m?.message;
            console.log("mensasje == " + mensaje)
            return (<ToastContainer>
              {toast.info(m?.message)}
            </ToastContainer>)
          }
        } catch (error) {
          alert(error)
        }

      });




    return () => {

      messagesSubscription.unsubscribe();
      webSocketService.disconnect();
    }



  }, []);

  // const handleWebSocketMessage = (m) => {
  //   let info = AuthService.getUserInfo();
  //   try {
  //     if (m?.username === info?.sub) {
  //       setMessage(m?.message)
  //     }
  //   } catch (error) {
  //     // Manejar errores aquí si es necesario
  //   }
  // };

  return (



    <div className="w-full h-[100vh] bg-gradient-to-tl from-[#062863] to-[#000000ab] to-[69%]">



      <Routes>

        <Route path='*' element={<>NOT FOUND</>} />
        <Route path="https://thriving-entremet-b01d40.netlify.app/form/:id?" element={<Formulario />} />
        <Route path="https://thriving-entremet-b01d40.netlify.app/home/user" element={<UsuarioPage />} />

        <Route element={<ProtectedRouteToken />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="https://thriving-entremet-b01d40.netlify.app/historial/:id?" element={<HistorialPage />} />
        </Route>


        <Route element={<ProtectedRoute />}>
          <Route path="https://thriving-entremet-b01d40.netlify.app/tabla" element={<TablaPage />} />

        </Route>

        {/* <Route element={<ProtectedRouteUser />}>

        </Route> */}

      </Routes>

      <ToastContainer />

    </div>


  );
}

export default App;
