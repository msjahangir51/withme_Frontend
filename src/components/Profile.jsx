import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../App'
import { MdCameraEnhance } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import Cookies  from 'js-cookie';
import apiUrl from '../assets/secret';
import axios from 'axios';
function Profile() {
  const {user} = useContext(Context)

  const [image,SetImage] = useState()
  const [Uploaded,SetUploaded] = useState(0)
  useEffect(()=>{
    let fromData = new FormData();
    fromData.append("image",image);
    fromData.append("userId", user._id);
    image? axios.put(apiUrl+"/profile/picture/update", fromData,{
      onUploadProgress: (data)=>{
        SetUploaded(Math.floor((data.loaded / data.total) * 100))
      }
    }).then((success)=>{
      SetImage("")
      SetUploaded(null)
      setTimeout(() => {
        location.reload()
      }, 1000);
    }).catch(err=>{
      console.log(err);
    }): null
    
  },[image])
  const handleLogout = ()=>{
    Cookies.remove("token")
    location.reload()
  }
  return (
    <div className='h-screen w-full overflow-scroll relative'>
      {/* progress bar  */}

{image ? (
  <div className='absolute left-0 right-0 top-0 bottom-0 bg-black/25 z-50 flex items-center justify-center'>
    <div className="w-[70%] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative">
      <div
        role='progressbar'
        aria-valuenow={Uploaded}
        aria-valuemin="0"
        aria-valuemax="100"
        className={`bg-blue-600 h-2.5 rounded-full transition-all ease-linear`}
        style={{ width: `${Uploaded}%`, transitionDuration: '300ms' }}
      />
      <div
        className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white"
        style={{ transitionDuration: '300ms' }}
      >
        {Uploaded}%
      </div>
    </div>
  </div>
) : ""}


      {/* profile  */}
      <label htmlFor="profile" className='block w-[7rem] h-[7rem] mx-auto mt-5 cursor-pointer relative rounded-full overflow-hidden' title='upload image'>
        <input type="file" onChange={(e)=> SetImage(e.target.files[0])} accept="image/*" className="hidden" id="profile" />
      {!user.profileImage? <img className='w-full object-cover' draggable="false" src={`${apiUrl}/${user.gender}.png`} alt="" />:<img className='w-full object-cover' src={`${apiUrl}/${user.profileImage}`} draggable="false" alt="" />}
      <MdCameraEnhance className='absolute bottom-4 right-2 text-white text-2xl'/>
      </label>


      <div className='text-center text-white'>
        <h1 className='text-2xl mt-3 font-bold'>{user.fullName || user.fullName}</h1>
        <h1 className='text-base font-bold'>username: {user.username || user.username}</h1>
        <h1>Gender: {user.gender || user.gender}</h1>
        <button onClick={handleLogout} className='text-[1.2rem]'> Logout <IoIosLogOut className='inline text-red-500'/></button>
      </div>
    </div>
  )
}

export default Profile