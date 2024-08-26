import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from './../App';
import io from 'socket.io-client';
import { IoSend } from "react-icons/io5";
import axios from 'axios';
import apiUrl from '../assets/secret';
function Inbox() {
    const {user,SelectedUser,SetshowSearch} = useContext(Context)
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    

    const socket = io(apiUrl);
  const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

  useEffect(() => {
    if (user._id && SelectedUser._id) {
      SetshowSearch(false)
      const room = {sender:user._id, receiver:SelectedUser._id}
      socket.emit('joinRoom', room);

      // Fetch previous messages between the two users
      axios
        .get(apiUrl+`/api/find/message/${user._id}/${SelectedUser._id}`)
        .then((res) => {
          setMessages(res.data);
          scrollToBottom()
        })
        .catch((err) => console.error('Failed to fetch messages:', err));
        
        // Listen for new messages in real-time
        socket.on('receiveMessage', (data) => {;
          setMessages((prevMessages) => [...prevMessages, data]);
          scrollToBottom();
      });
      
      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [user._id,SelectedUser]);
  
  const sendMessage = async() => {
    
    if (message.trim() && SelectedUser) {
      const newMessage = {
        sender: user._id,
        receiver: SelectedUser._id,
        message,
      };
      
      await socket.emit('sendMessage', newMessage);
      scrollToBottom();
      setMessage('');
    }
  };




  return ( 
    <div className='h-screen w-full p-4 overflow-hidden'>
        {/* massenger nav  */}
        <div className='flex items-center border-b-2 border-zinc-50/20 p-2'>
            {!SelectedUser.profileImage? <img className='w-[2.4rem] rounded-full' src={`https://withme-backend.onrender.com/${SelectedUser.gender}.png`} alt="" />:<img className='w-[2.4rem] rounded-full' src={`https://withme-backend.onrender.com/${SelectedUser.profileImage}`} alt="" />}
        <h1 className='text-white ml-3'>{SelectedUser.fullName}</h1>
        </div>

        {/* message  */}

<div className="flex flex-col space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`flex items-start ${msg.sender === user._id ? 'justify-end' : 'justify-start'}`}
      >
      {msg.sender !== user._id && (
        <img
          className="w-[2rem] rounded-full mr-2"
          src={`https://withme-backend.onrender.com/${SelectedUser.profileImage || SelectedUser.gender}.png`}
          alt="Profile"
        />
      )}
      <div className={`p-2 rounded-lg max-w-[75%] bg-blue-500 text-white break-words ${msg.sender === user._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
        <strong>{msg.sender === user._id ? 'You' : SelectedUser.name}</strong>: 
        <span className="break-words overflow-wrap-anywhere">{msg.message}</span>
      </div>
    </div>
  ))}
<div ref={messagesEndRef} />
</div>




      <div className='bg-zinc-700 px-3 w-full flex h-[2.5rem] items-center justify-between'>
        <input value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()} className='w-[80%] bg-zinc-600 py-1 text-white placeholder:text-white border outline-none px-2 rounded-sm' type="text" placeholder='message...' />
        <button onClick={sendMessage} className='text-white'><IoSend/></button>
      </div>
    </div>
  )
}

export default Inbox