import React from 'react'

export const Button = ({type,onClick,text,disabled}) => {
  return (
    
    <button className='ripple contenedor bg-gradient-to-tl  py-2 from-[#000035] to-[#000000fd] to-[69%]  hover:via-[100%] font-bold text-white h-[100%px] rounded-2 w-full max-sm:h-[50px]' type={type} onClick={onClick}
    disabled={disabled}
    >{text}
    </button>

  )
}
