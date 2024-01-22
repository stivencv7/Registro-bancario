import React from 'react'
import { FaSpinner } from 'react-icons/fa6';
export const Spinner = ({className}) => {
  return (
    <div className='flex items-center justify-center relative'>
        <FaSpinner className='animate-spin text-[80px] absolute text-[#607ec9]'/>
    </div> 
  )
}
