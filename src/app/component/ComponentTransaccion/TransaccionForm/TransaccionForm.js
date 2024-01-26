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
import { ToastContainer, toast } from "react-toastify";
import { Button } from "../../../share/Button";

export const TransactionForm = () => {

    const [description, setDescription] = useState('')
    const [usuario, setUsuario] = useState(new Usuario())
    const [monto, setAmount] = useState('')
    const [numeroCuenta, setNumeroCuetna] = useState('')
    const [visible, setVisible] = useState(false)
    const [historial, setHistoria] = useState([])
    const [typeTranfe, setTypeTranfe] = useState(0)

    //  const { sendLengthP, getMessage } = useWebSocket();

    const getHistorial = async (id) => {
        try {
            let historias = await getHistoria(id);
            setHistoria(historias);
        } catch (error) {
            swal("", error + " 1", "error")
        }
    }

    const getUsario = async (username) => {
        try {
            return await getUserEmail(username);
        } catch (error) {
            swal("", error + " 2", "error")
        }
    }

    useEffect(() => {

        // webSocketService.connect()

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
            console.log("mensaje en formulario= "+m)
            buscarUsuario()

        })

        // return () => {

        //     webSocketService.disconnect();

        // };
    }, [])


    const validarType = () => {

        if (typeTranfe == 2 || typeTranfe == 3) {
            return -monto;
        }

        return monto
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (usuario?.numeroCuenta == numeroCuenta || description == '' || (typeTranfe!=1 && monto > usuario?.saldo)) {
                swal("ERROR", "Tranferencia no permitida", 'error')
            } else {

                if (visible && !numeroCuenta) {
                    toast.error("Ingrese el nummero de cuenta o desabilitalo")
                } else {

                    let newmonto = validarType()
                    let historial = { descripcion: description, monto: newmonto }
                    await saveHistorial(usuario.id, historial);
                    getHistorial(usuario.id)
                    // setAmount(0)
                    // setDescription('')
                    let user = await getUsario(usuario?.username);
                    setUsuario(user)

                    if (numeroCuenta && visible) {
                        let u = await getUserTransaccion(numeroCuenta);
                        alert(numeroCuenta)
                        tranferencia();
                        handleSendLengthP(numeroCuenta)

                    } else {
                        toast.success("Tranferencia exitosa");

                    }
                }

            }
        } catch (error) {
            swal("ERROR", error, 'error')
        }

        cleanFields();
    }

    const cleanFields = () => {
        setTypeTranfe(0)
        setAmount('')
        setDescription('')
        setNumeroCuetna('')
        setVisible(false);

    }

    const tranferencia = async () => {

        try {
            let newMonto = validarType();
            await setTransaccion(usuario, numeroCuenta, newMonto);
            //retorna a al componente TableUser
            toast.success("Tranferencia exitosa")

        } catch (error) {
            swal(error + " 5","error")
        }
    }

    const handleSendLengthP = (numeroCuenta) => {
        setVisible(false)
        setNumeroCuetna()
        WebSocketService.sendLengthP(numeroCuenta,usuario);
    };

    const handleTypetranfe = (e) => {
        if (e.target.value == 3) {
            setVisible(true)
        } else {
            setVisible(false)
        }
        setTypeTranfe(e.target.value)

    }
    return (
        <div className='page-login min-h-screen  py-[30px] max-sm:py-0 max-sm:px-2 flex max-sm:flex-col   max-sm:justify-start  gap-[30px] justify-around max-sm:w-full max-sm:px  max-sm:relative'>
            <div className="max-sm:absolute max-sm:right-11 top-2 z-50">
                <SidebarMenu id={usuario.id} />
            </div>

            <div className='max-sm:px-4 max-sm:h-full  shadow-2xl shadow-black bg-gradient-to-br   from-[#062863] to-[#00000046] to-[69%]  h-[26em]  w-[20%] flex justify-center  items-center bg-opacity-50 flex-col rounded-md relative  max-sm:w-full '>

                {/* <div className="absolute top-0 max-sm:bottom-[400px] w-[40%] ">
                    <Button onClick={() => { visible ? setVisible(false) : setVisible(true) }} text={visible ? 'movimiento' : 'cuenta'} />
                </div> */}

                <Balance usuario={usuario} monto={monto} typeTransaccion={typeTranfe} />

                <form className="flex flex-col gap-[20px] max-sm:w-full" onSubmit={handleSubmit}>

                    <div  >
                        <select className="w-full h-9 rounded-2" value={typeTranfe} onChange={handleTypetranfe} >
                            <option selected>Tipo de tranferencia</option>
                            <option value={1}>Venta</option>
                            <option value={2}>Compra</option>
                            <option value={3}>Tranferencia</option>
                        </select>
                    </div>

                    <div>
                        <input className="form-control" type="text" placeholder="Enter a Description" value={description}
                            onChange={(e) => setDescription(e.target.value)} disabled={!typeTranfe}
                        />
                    </div>

                    <div>
                        <input className="form-control" type="number" placeholder="Enter a monto" value={monto} disabled={!typeTranfe}
                            onChange={(e) => setAmount(e.target.value)} min={1} 
                        />
                    </div>

                    <div>
                        <input cla placeholder={`# Cuenta ${visible ? ' Habilitado' : 'Inhabilitado'}`} className={`form-control `} type="number" value={numeroCuenta} disabled={!visible}
                            onChange={(e) => setNumeroCuetna(e.target.value)}
                        />
                    </div>
                    <div className="max-sm:mt-6">
                        <Button type={'submit'} text={"transacion"} />
                    </div>

                </form>
            </div>
            <div className="w-[50%] max-sm:hidden ">
                <TablaHistorial historial={historial} />
            </div>
            {/* <ToastContainer/> */}
        </div>

    )
}