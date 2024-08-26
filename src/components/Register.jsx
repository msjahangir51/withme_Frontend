import axios from 'axios'
import React, { useEffect, useState } from 'react'
import apiUrl from '../assets/secret'
import { useNavigate } from 'react-router-dom'
function Register() {
  const navigate = useNavigate()
  const [fullname,setFullName] = useState("");
  const [fullnameEmpty,setFullNameEmpty] = useState(false);
  const [username,setUsername] = useState("");
  const [usernameEmpty,setUsernameEmpty] = useState(false);
  const [password,setPassword] = useState("");
  const [passwordEmpty,setPasswordEmpty] = useState(false);
  const [gender,setGender] = useState("");
  const [loading,setLoading] = useState(false);
  const registerBTN = ()=>{
    if(!fullname) return setFullNameEmpty(true);
    if(!username) return setUsernameEmpty(true);
    if(!password) return setPasswordEmpty(true);
    if(!gender) return alert("Please Select Your Gender");
    setLoading(true)
    axios.post(apiUrl+"/api/register",{fullname, username,password,gender}).then((user)=>{
      console.log(user)
      setLoading(false)
      setFullName("")
      setUsername("")
      setPassword("")
      setGender("")
      navigate("/")
    }).catch((err)=>{
      alert(err.response.data.message)
      setLoading(false)
    })
  }
  return (
    <div className='bg-main-color w-full min-h-screen h-auto flex items-center justify-center'>
        <div className=' bg-[#333333] h-auto flex flex-col items-center w-[80%] max-w-[20rem] gap-y-3 py-5 rounded-md'>
        <input onChange={(e)=> setFullName(e.target.value)} value={fullname} className={fullnameEmpty? 'inputbox border-red-400 placeholder:text-red-400':"inputbox"} type="text" placeholder='Enter your FullName' />
        <input onChange={(e)=> setUsername(e.target.value)} value={username} className={usernameEmpty? 'inputbox border-red-400 placeholder:text-red-400':"inputbox"} type="text" placeholder='Enter your username' />
        <input onChange={(e)=>setPassword(e.target.value)} value={password}  className={passwordEmpty? 'inputbox border-red-400 placeholder:text-red-400':"inputbox"} type="text" placeholder='Enter your password' />
          <div className='flex text-white uppercase gap-x-4'>
            <label htmlFor="male">
              male
              <input onChange={()=>setGender("male")} value={gender} className={'ml-2'} type="radio" name="male" id="male" />
            </label>
            <label htmlFor="female">
              female
              <input onChange={()=> setGender("female")} value={gender} className='ml-2' type="radio" name="male" id="female" />
            </label>  
          </div>
          {
            loading? <button className='bg-[#fd4648] px-6 py-[1px] text-white vsm:text-sm sm:text-base font-bold rounded-full'>
            <div className="loader-container">
              <div className='loading-text'>Loading<span className="dots"></span></div>
            </div>
        </button> : <button onClick={registerBTN} className='bg-[#fd4648] px-6 py-[1px] text-white vsm:text-sm sm:text-base font-bold rounded-full tracking-wider'>Register</button>
          }

        <p className='text-white mt-2-'>You have an Account <a href='/' className='text-cyan-500 capitalize underline'>Login</a></p>
      </div>
    </div>
  )
}

export default Register