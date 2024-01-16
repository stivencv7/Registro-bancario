import React from 'react'

export const Balance = ({ usuario,monto }) => {

    return (
        <div>

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
                <h5 className={monto<0?'text-red-700':'text-green-700'}>{monto}</h5>
                </div>
            </div>


        </div>
    )
}