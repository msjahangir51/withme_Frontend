import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import apiUrl, { AuthToken } from '../assets/secret'
import { IoSearch } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { Context } from '../App';
import Message from '../components/Message';
import Inbox from '../components/Inbox';
import { RiMessage3Fill } from 'react-icons/ri';
import Profile from '../components/Profile';

function Chat() {
    
    const {SetSelectedUser,SelectedUser,user,SetshowSearch,showSearch,ClickRoute,SetClickRoute} = useContext(Context);
    const [search,SetSearch] = useState("")
    const [searchdata,Setsearchdata] = useState()
    const handleSearch = ()=>{
        SetshowSearch(!showSearch);
    }

    useEffect(()=>{
        if(search){
            axios.get(apiUrl+`/api/search?search=${search}`,AuthToken).then(users=>{
                Setsearchdata(users.data)
            })
        }
    },[search])

    const selectuserHandle = (user)=>{
        SetSelectedUser(user)
        SetClickRoute("inbox")
    }
    return (
    <div className='bg-main-color w-full min-h-screen'>
     <div className='bg-main-color w-full text-white relative shadow-sm shadow-gray-200 h-20'>
        {/* search area  */}
        <div className='absolute right-5 top-8 p-2 rounded-lg glassyeffact z-20 flex items-center justify-between w-fit overflow-hidden'>
            <input type='text' className={showSearch?'bg-transparent outline-none':'bg-transparent outline-none w-0 overflow-hidden'} placeholder='Search .....' onChange={(e)=>SetSearch(e.target.value)}/>
            <button onClick={handleSearch}><IoSearch className='text-2xl'/></button>
        </div>

        {/* message  */}
        <div className='absolute left-20 top-8 p-2 rounded-lg shadow-round flex items-center justify-between w-fit overflow-hidden'>
            <button onClick={()=> SetClickRoute("message")}><RiMessage3Fill className='text-2xl'/></button>
        </div>
        {/* profile  */}
        <div className='absolute left-3 top-7 w-[2.7rem] h-[2.7rem] bg-red-100 rounded-full overflow-hidden shadow-round flex items-center justify-between'>
            <button onClick={()=>SetClickRoute("profile")}>{!user.profileImage? <img className='w-full object-cover' src={`https://withme-backend.onrender.com/${user.gender}.png`} alt="" />:<img className='w-full object-cover' src={`https://withme-backend.onrender.com/${user.profileImage}`} alt="" />}</button>
        </div>
        {
            showSearch?
            <div className={'glassyeffact z-50 absolute top-20 right-4 w-[14rem] gap-y-4 flex flex-col'}>
                {
                    searchdata ? searchdata.map((user)=>{
                        return(
                            <div className='flex justify-start relative bg-[#4444] p-2 rounded-md' key={user._id}>
                               {!user.profileImage? <img className='w-[2.4rem] rounded-full' src={`https://withme-backend.onrender.com/${user.gender}.png`} alt="" />:<img className='w-[2.4rem] rounded-full' src={`https://withme-backend.onrender.com/${user.profileImage}`} alt="" />}
                               <div className='ml-1'>
                                <h1>{user.username}</h1>
                                <p className='text-[10px]'>{user.fullName}</p>
                               </div>
                               <button onClick={()=> selectuserHandle(user)} className='absolute right-3 top-5 text-2xl'><IoIosSend /></button>
                            </div>
                        )
                    }):<div>Your Friends not Found</div>
                }


            </div>
            :""
        }
    </div>
    {/* <Message/> */}
    {
        ClickRoute=== "profile"? <Profile/>:ClickRoute==="message"? <Message/>:ClickRoute=== "profile" ? <Profile/>: ClickRoute=== "inbox"?<Inbox/>:<Message/>
    }
    </div>
)
}

export default Chat