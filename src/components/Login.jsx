import axios from 'axios'
import React, { useEffect, useState } from 'react'
import apiUrl from '../assets/secret';
import Cookies  from 'js-cookie';
function Login() {
  const [username,setUsername] = useState("")
  const [usernameEmpty,setUsernameEmpty] = useState(false)
  const [password,setPassword] = useState("")
  const [passwordEmpty,setPasswordEmpty] = useState(false)
  const [loading,setLoading] = useState(false);
  const LoginBTN = async ()=>{
    if(!username) return setUsernameEmpty(true);
    if(!password) return setPasswordEmpty(true);
    setLoading(true)
    await axios.post(apiUrl+"/api/login",{username:username,password:password}).then(user=>{
      if(Cookies.get("token")){
        Cookies.remove("token")
      }else{
        Cookies.set("token", user.data.token)
        setUsername("")
        setPassword("")
        location.reload()
      }
    }).catch(err=>{
      alert(err.response.data.message)
      setLoading(false)
    })
  }
  return (
    <div className='bg-main-color w-full min-h-screen h-auto flex items-center justify-center'>
        <div className=' bg-[#333333] h-auto flex flex-col items-center w-[80%] max-w-[20rem] gap-y-3 py-5 rounded-md'>
        <input onChange={(e)=> setUsername(e.target.value)} value={username} className={usernameEmpty? 'inputbox border-red-400 placeholder:text-red-400':"inputbox"} type="text" placeholder='Enter your username' />
        <input onChange={(e)=>setPassword(e.target.value)} value={password}  className={passwordEmpty? 'inputbox border-red-400 placeholder:text-red-400':"inputbox"} type="text" placeholder='Enter your password' />



        {
            loading? <button className='bg-[#fd4648] px-6 py-[1px] text-white vsm:text-sm sm:text-base font-bold rounded-full'>
            <div className="loader-container">
              <div className='loading-text'>Loading<span className="dots"></span></div>
            </div>
        </button> : <button onClick={LoginBTN} className='bg-[#fd4648] px-6 py-[1px] text-white vsm:text-sm sm:text-base font-bold rounded-full tracking-wider'>Log in</button>
          }

        <p className='text-white mt-2-'>Create an Account <a href='/register' className='text-cyan-500 capitalize underline'>register</a></p>
      </div>
    </div>
  )
}

export default Login