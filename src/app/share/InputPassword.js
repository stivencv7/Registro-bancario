import React, { useState } from 'react'
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

export const InputPassword = ({className,value,onChange,name,placeholder,onBlur,required,disabled}) => {
    
    const [type,setType]=useState('password')

    const handleType=()=>{
        if(type=='password'){
            setType('text')
        }else{
            setType('password')
        }
    }
    
    return (
        <div className='relative'>
            <input className={className} type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} onBlur={onBlur} required={required} disabled={disabled}></input>
            {type == 'text' ?
                <FaEyeSlash className='z-50 absolute left-0 bottom-0 mb-2 text-[#d00034] text-[24px] pl-1 mr-50' onClick={handleType} />
                :
                <FaEye className='z-50 absolute left-0 bottom-0 mb-2 text-[#d00034] text-[24px] pl-1 mr-50 ' onClick={handleType} />
            }
        </div>
    )
}
