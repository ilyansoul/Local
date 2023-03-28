import React from 'react'
import '../styles/Chat.css'


const Chat = ({descendingOrderMessages}) => {
    return (
        <div className="chat-display">
            {descendingOrderMessages.map((message, index) => (
                <div key={index}>
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