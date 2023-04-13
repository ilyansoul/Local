import React from 'react'
import '../styles/Chat.css'

const Chat = ({ messagesDecroissant }) => {
  return (
    <div className="chat-display">
      {messagesDecroissant
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
        .map((message, index) => (
          <div className='textmessage' key={index}>
            <div className="chat-message-header">
              <div className="img-container">
                <img className='image-content' src={message.img} alt={message.name + ' profile'}/>
              </div>
            </div>
            <p className='text-content'>{message.message}</p>
            <p>{message.timestamp}</p>
          </div>
        ))}
    </div>
  )
}

export default Chat