import React from 'react'
import '../styles/ChatHeader.css';
import  Logo from '../logo.png';


const ChatHeader = ({ user }) => {


   

    return (
        <div className="chat-container-header">
            {user ? (
                <>
                    <div className="profile">
                        <img className='profile-img' src={Logo} alt="" />

                            <img className='profile-photo' src={user.url} alt={"photo of " + user.first_name}/>
                        </div>
                        <h3 className='user-name'>{user.first_name}</h3>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}

export default ChatHeader
