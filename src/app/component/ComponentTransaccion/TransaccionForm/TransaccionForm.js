import { useEffect, useState } from "react";
import { Balance } from "../../Balance/Balance";
import { getHistoria, getUser, getUserEmail, getUserTransaccion, setTransaccion } from "../../../service/ServiceUsuario/ServiceUsuario";
import AuthService from "../../../service/Login/LoginService";
import { saveHistorial } from "../../../service/ServiceHistorial/ServiceHistorial";
import { TablaHistorial } from "../../TablaHistorial/TablaHistorial";
import Usuario from "../../../models/Usuario";
import { SidebarMenu } from "../../Sidebar/SidebarMenu";
import swal from 'sweetalert2'
import WebSocketService from "../../../service/WebSocketService/WebSocketService";
import webSocketService from "../../../service/WebSocketService/WebSocketService";
import { ToastContainer,toast } from "react-toastify";

export const TransactionForm = () => {

    const [description, setDescription] = useState('')
    const [usuario, setUsuario] = useState(new Usuario())
    const [monto, setAmount] = useState()
    const [numeroCuenta, setNumeroCuetna] = useState()
    const [visible, setVisible] = useState()

    const [historial, setHistoria] = useState([])

    //  const { sendLengthP, getMessage } = useWebSocket();

    const getHistorial = async (id) => {
        try {
            let historias = await getHistoria(id);
            setHistoria(historias);
        } catch (error) {
            swal("", error+" 1", "error")
        }
    }

    const getUsario = async (username) => {
        try {
            return await getUserEmail(username);
        } catch (error) {
            swal("", error+" 2", "error")
        }
    }

    useEffect(() => {

        webSocketService.connect()

        const buscarUsuario = async () => {

            let info = AuthService.getUserInfo();
            let user = await getUsario(info?.sub);
            if (user) {
                getHistorial(user?.id)
                setUsuario(user);
            } else {
                setUsuario(null)
            }
        }
        buscarUsuario();

        webSocketService.messagesSubject.asObservable().subscribe(m => {
            buscarUsuario()

        })

        return () => {
            
         webSocketService.disconnect();

        };
    }, [])



    const tranferencia = async () => {
        try {
           await setTransaccion(usuario, numeroCuenta, monto);
            //retorna a al componente TableUser
            toast.success("Tranferencia exitosa")
        } catch (error) {
            swal(error+" 5", "", "error")
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
        
            if (usuario?.numeroCuenta == numeroCuenta || description=='' || monto>usuario?.saldo) {
                swal("ERROR", "Tranferencia no permitida", 'error')
            } else {

                let historial = { descripcion: description, monto: monto }
                await saveHistorial(usuario.id, historial);
                getHistorial(usuario.id)
                setAmount(0)
                setDescription('')
                let user = await getUsario(usuario?.username);
                setUsuario(user)

                if (numeroCuenta && visible) {
                    let u=await getUserTransaccion(numeroCuenta);
                    tranferencia();
                    handleSendLengthP(numeroCuenta)

                }else{
                    toast.success("Tranferencia exitosa");
            
                }

            }
        } catch (error) {
            swal("ERROR", error, 'error')
        }

    }

    const handleSendLengthP = (numeroCuenta) => {
        setVisible(false)
        setNumeroCuetna()
        WebSocketService.sendLengthP(numeroCuenta);
    };

    return (
        <div className='page-login min-h-screen py-4 flex gap-[30px] justify-around'>
           
            <SidebarMenu id={usuario.id} />
            <div className='shadow-2xl shadow-black bg-black h-[26em]  w-[20%] flex justify-center items-center bg-opacity-50 flex-col rounded-md relative '>
                <button onClick={() => { visible ? setVisible(false) : setVisible(true) }} className=" bg-gray-800  absolute  w-1/1  text-white px-2 py-1 rounded-lg top-0 left-[25px]">{visible ? 'Pasar a compra y venta' : 'Tranferir a cuenta'}</button>
                <Balance usuario={usuario} monto={monto} />
                <form className="flex flex-col gap-[20px]"  onSubmit={handleSubmit}>
                    <div>
                        <input className="form-control" type="text" placeholder="Enter a Description" value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    {
                        visible ?
                            <div>
                                <input placeholder='Numero Cuenta' className="form-control" type="number" value={numeroCuenta}
                                    onChange={(e) => setNumeroCuetna(e.target.value)}
                                />
                            </div>
                            :
                            <></>
                    }
                    <div>
                        <input className="form-control" type="number" placeholder="Enter a monto" value={monto}
                            onChange={(e) => setAmount(e.target.value)} 
                        />
                    </div>
                    <button className="btn btn-primary">
                        Transacción
                    </button>
                </form>
            </div>
            <div className="w-[50%]">
                <TablaHistorial historial={historial} />
            </div>
            {/* <ToastContainer/> */}
        </div>

    )
}