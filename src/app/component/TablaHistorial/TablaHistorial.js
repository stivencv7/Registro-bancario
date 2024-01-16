import React, { useEffect, useState } from 'react'

export const TablaHistorial = ({ historial = [] }) => {


    return (
        <main >
            <section>
                <di>
                    <div className='font-bold'><h3>Historial</h3></div>
                    <br></br>
                    <div className='flex flex-col gap-[15px]'>
                        {historial.map((item) => (
                            <div className='bg-[#0000008a] w-100 font-bold text-white rounded-xl px-4 shadow-[#b6b6b6] ' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',fontSize:'20px'}} key={item.id}>
                                <div className='py-2'>{item.descripcion}</div>
                                <div>{item.monto}</div>
                            </div>
                        ))}
                    </div>
                </di>
            
            </section>
        </main>
    )
}
