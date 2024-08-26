import React from 'react'
import { AiFillMessage } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'; 
import Message from '../components/Message';

function FoundRoute() {
    const navigate = useNavigate()
  return (
    <div className='h-auto min-h-screen w-full bg-main-color flex items-center justify-center relative'>
        <h1 className='text-white text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-wider'>404 Not Found</h1>
    </div>
  )
}

export default FoundRoute