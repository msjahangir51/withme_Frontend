import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import apiUrl from '../assets/secret'
import { Context } from '../App'

function Message() {
  const {user,SetSelectedUser,SetClickRoute,} = useContext(Context);
  const [Profiles,SetProfiles] = useState([])
  useEffect(()=>{
    if(user){ axios.get(apiUrl+`/api/message/profiles/${user._id}`).then(user=>{
      SetProfiles(user.data)
    })
  }
  },[user])
  const handleSElectedPRofile = (profile)=>{
    SetSelectedUser(profile);
    SetClickRoute("inbox")

  }
  return (
    <div className='h-screen w-full overflow-scroll'>
           {
            !Profiles || Profiles.map(profile=>{
              return(
                <div key={profile._id} onClick={()=> handleSElectedPRofile(profile)} className='flex items-center my-3 w-[80%] mx-auto h-[3rem] bg-zinc-500/25 px-4 py-3 text-white'>
                  {!profile.profileImage? <img className='w-[2.4rem] rounded-full' src={`http://localhost:4000/${profile.gender}.png`} alt="" />:<img className='w-[2.4rem] rounded-full' src={`http://localhost:4000/${profile.profileImage}`} alt="" />}

                  <p className='ml-2'>{profile.fullName}</p>
                </div>
              )
            })
           }
    </div>
     )
}

export default Message