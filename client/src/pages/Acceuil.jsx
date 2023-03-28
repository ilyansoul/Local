import React from 'react'
import Logo from '../components/logo.png';
import '../components/styles/Acceuil.css'
import { Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom'


function Acceuil() {
  return (
    <React.Fragment>
      <div className='background-m'>
      <div className='nav-bar'>
        <img className='logo-acceuil' src={Logo} alt="" />
        <a className='btnc-acceuil'>
          <Link to="/register"> Inscription </Link>
          <Link to="/login"> Connexion </Link>
        </a>
      </div>


      <div className='main-acceuil'>
        <div class="hero-image">
          <div class="hero-text">
            <h1 className='title'>FindYourTaste</h1>
            <h2 className='sub-title'> Site de Rencontre repondant a vos besoins</h2>
          </div>
        </div>
      </div>
      </div>
      <div className='descript'>
        <div className='item'>
        <Icon disabled name='like' />    
        <h1 className='up-title'>Modes inedits</h1>
         <p>Amical , Aventures , Serieux</p>
        </div>
        <div className='item'>
        <Icon loading name='shield' />
          <h1 className='up-title'>100% securise</h1>
          <p>Votre protection avant tout</p>
        </div>
        <div className='item'>
        <Icon disabled name='law' />
          <h1 className='up-title'>Egalite Genre</h1>
          <p>Memes droits et privilleges </p>
        </div>
      </div>

    </React.Fragment>
  )
}

export default Acceuil