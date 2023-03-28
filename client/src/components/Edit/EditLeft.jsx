import React from 'react'
import ChatHeader from '../Chat/ChatHeader'
import '../styles/EditLeft.css'
import { useCookies } from 'react-cookie'


function EditLeft({user}) {
  const [ cookies, setCookie, removeCookie ] = useCookies(['user'])

  const logout = () => {
    removeCookie('UserId', cookies.UserId)
    removeCookie('AuthToken', cookies.AuthToken)
    window.location.reload()
}
  return (
    <div className='links-container'>
      <div className='left-side'>
        <ChatHeader user={user} />

        <a href="/editprofil"><button className='btn-links'>Modifier Informations</button></a>
        <a href="/homepage/localisation"><button className='btn-links'>Localisation</button></a>
        <a href=""><button className='btn-links'>Distance utulisateurs</button></a>
        <a href="/"><button onClick={logout} className='btn-links'>Deconnexion</button></a>
      
  
      </div>
    </div>
  )
}

export default EditLeft