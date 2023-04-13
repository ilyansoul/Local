import Chat from './Chat'
import ChatInput from './ChatInput'
import axios from 'axios'
import { useState, useEffect } from "react"


const ChatDisplay = ({ user, clickedUser }) => {
    // recupere l'id de l'utulisateur s'il est definit sinon renvoie undefined
    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id
    const [usersMessages, setUsersMessages] = useState(null)
    const [clickedUsersMessages, setClickedUsersMessages] = useState(null)

    const getUsersMessages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/messages', {
                params: { userId: userId, correspondingUserId: clickedUserId }
            })
            setUsersMessages(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getClickedUsersMessages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/messages', {
                params: { userId: clickedUserId, correspondingUserId: userId }
            })
            setClickedUsersMessages(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUsersMessages()
        getClickedUsersMessages()

        const intervalId = setInterval(() => {
            getUsersMessages()
            getClickedUsersMessages()
        }, 1000)

        return () => clearInterval(intervalId)
    }, [])

    const currentUserMessages = [];
    const clickedUserMessages = [];

    usersMessages?.forEach(message => {
        const formattedMessage = {};
        formattedMessage['name'] = user?.first_name;
        formattedMessage['img'] = user?.url;
        formattedMessage['message'] = message.message;
        formattedMessage['timestamp'] = message.timestamp;
        currentUserMessages.push(formattedMessage);
    });

    clickedUsersMessages?.forEach(message => {
        const formattedMessage = {};
        formattedMessage['name'] = clickedUser?.first_name;
        formattedMessage['img'] = clickedUser?.url;
        formattedMessage['message'] = message.message;
        formattedMessage['timestamp'] = message.timestamp;
        clickedUserMessages.push(formattedMessage);
    });

    const messages = [...currentUserMessages, ...clickedUserMessages]; // Concatener les 2 tableaux en un seul
    const messagesDecroissant = messages?.sort((a, b) => a.timestamp.localeCompare(b.timestamp)); // trie les messages par ordre decroissant

    console.log('usersMessages', usersMessages);
    console.log('formattedMessages', messages);

    return (
        <>
            <Chat messagesDecroissant={messages} isSender={true} />

            <ChatInput
                user={user}
                clickedUser={clickedUser}
                getUserMessages={getUsersMessages}
                getClickedUsersMessages={getClickedUsersMessages} />
        </>
    )
}

export default ChatDisplay
