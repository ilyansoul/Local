import React from 'react'
import ChatDisplay from './ChatDisplay'
import MatchesDisplay from './MatchesDisplay'
import '../styles/ChatContainer.css'
import { useState } from "react";


function ChatContainer({user}) {
const [ clickedUser , setClickUser] = useState(null)

  return (
    <div className='chat-container'>
        
   

    <div className='btn-position'>

    <button className='match-btn' onClick={() => setClickUser(null)}>Matches</button>
    <button className='chat-btn' disabled={!clickedUser}>Chat</button>
    
    </div>

    { !clickedUser && <MatchesDisplay matches={user.matches} setClickUser={setClickUser}/>}
    {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser}/>}    </div>
  )
}

export default ChatContainer