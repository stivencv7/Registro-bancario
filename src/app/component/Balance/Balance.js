import React from 'react'

export const Balance = ({ usuario,monto,typeTransaccion }) => {

    return (
        <div className='max-sm:mt-20 max-sm:flex  max-sm:flex-col max-sm:w-full mb-4  flex flex-col justify-center'>

            <div className='gap-20 text-white font-bold flex justify-between'>
                <div className='text-start'>
                    <label className='text-white'>Usuario</label>
                    <h5>{usuario?.username}</h5>
                </div>

                <div className='text-end'>
                    <label className='text-white'># Cuenta</label>
                    <h5>{usuario?.numeroCuenta}</h5>
                </div>
            </div>
            <br></br>
            <div className='text-white font-bold flex justify-between'>
                
                <div className='text-start'>
                <label className='text-white'>Saldo</label>
                <h5 >{usuario?.saldo}</h5>
                </div>
                

                <div className='text-end'>
                {monto?
                <label> valor</label>
                :
                <label></label>
                }
                <h5 className={typeTransaccion==2 || typeTransaccion==3?'text-red-700':'text-green-700'}>{monto}</h5>
                </div>
            </div>


        </div>
    )
}
