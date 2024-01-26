import React from 'react'

export const Button = ({type,onClick,text,disabled}) => {
  return (
    
    <button className='ripple contenedor bg-[#d00034] bg-gradient-to-tl  py-2 from-[] from-[60%] to-[#00276c]  font-bold text-white h-[100%px] rounded-2 w-full max-sm:h-[50px]' type={type} onClick={onClick}
    disabled={disabled}
    >{text}
    </button>

  )
}
