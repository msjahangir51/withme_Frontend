import React, { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FoundRoute from './pages/FoundRoute'
import Login from './components/Login'
import Register from './components/Register'
import axios from 'axios'
import apiUrl, { AuthToken } from './assets/secret'
import Cookies  from 'js-cookie';
import Chat from './pages/Chat'
import Message from './components/Message'
export const Context = createContext();
function App() {
  const [ClickRoute,SetClickRoute] = useState();
  const [showSearch,SetshowSearch] = useState(false)
  const [isAuthentication,SetAuthentication] = useState(false)
  const [user,SetUser] = useState()
  const [SelectedUser,SetSelectedUser] = useState()
  const token = Cookies.get("token")
  useEffect(()=>{
    if(token){
      axios.get(apiUrl+"/api/profile",AuthToken).then(user=>{
        SetUser(user.data)
        SetAuthentication(true);
      }).catch((err)=>{
        console.log(err.response.data)
        if(err.response.data=== "Unauthorized"){
          Cookies.remove("token")
          SetAuthentication(false);
        }
      })
    }
  },[token])
  return (
    <Context.Provider value={{user,isAuthentication,SetSelectedUser,SelectedUser,SetshowSearch,showSearch,ClickRoute,SetClickRoute}}>
      <BrowserRouter>
        <Routes>
          {/* authenticaion use  */}
          <Route path='/' element={isAuthentication? <Chat/>:<Login/>}/>
          <Route path='/' element={isAuthentication? <Message/>:<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='*' element={<FoundRoute  />}/>
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App