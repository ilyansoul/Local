import { useState, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import ChatContainer from '../components/Chat/ChatContainer'
import ChatHeader from '../components/Chat/ChatHeader'
import axios from "axios";
import '../components/styles/HomePage.css';
import { useCookies } from 'react-cookie';
import EditLeft from '../components/Edit/EditLeft'
import { Icon } from 'semantic-ui-react'


const HomePage = () => {
  const [ShowAbout, setShowAbout] = useState(false)
  const [user, setUser] = useState(null)
  const [genderedUsers, setGenderedUsers] = useState(null)
  const [lastDirection, setLastDirection] = useState()
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [swipedUsers, setSwipedUsers] = useState([])
  
/* Définition de la variable userId qui stocke la valeur du cookie UserId */

  const userId = cookies.UserId

  /* Fonction asynchrone pour récupérer les informations de l'utilisateur */

  const getUser = async () => {
      try {
          const response = await axios.get('http://localhost:5000/user', {
              params: {userId}
          })
          setUser(response.data)
      } catch (error) {
          console.log(error)
      }
  }

/* Fonction asynchrone pour récupérer les utilisateurs correspondants au genre d'intérêt de l'utilisateur actuel */

  const getGenderedUsers = async () => {
      try {
          const response = await axios.get('http://localhost:5000/gendered-users', {
              params: {gender: user?.gender_interest}
          })
          setGenderedUsers(response.data)
      } catch (error) {
          console.log(error)
      }
  }

  /* Effect pour exécuter getUser() une fois au chargement de la page */

  useEffect(() => {
      getUser();
  }, [])
/* Effect pour exécuter getGenderedUsers() à chaque fois que user est modifié */


  useEffect(() => {
      if (user) {
          getGenderedUsers()
      }
  }, [user])

  /* Fonction asynchrone pour mettre à jour les correspondances en ajoutant l'utilisateur correspondant */

  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put('http://localhost:5000/addmatch', {
        userId,
        matchedUserId
      })
      await axios.put('http://localhost:5000/addmatch', {
        userId: matchedUserId,
        matchedUserId: userId
      })
      const intervalId = setInterval(getUser, 1000) // refresh every second
      await getUser()
      clearInterval(intervalId) // clear the interval
    } catch (err) {
      console.log(err)
    }
  }

  /* Fonction appelée lorsqu'un utilisateur est swip */

  const swiped = (direction, swipedUserId, swipedUser) => {
      if (direction === 'right') {
          updateMatches(swipedUserId)
      }
      setLastDirection(direction)
  }

  /* Fonction appelée lorsque la carte est hors de l'écran */

  const outOfFrame = (name) => {
      console.log(name + ' left the screen!')
  }


/* Récupération des correspondances de l'utilisateur actuel et stockage dans matchedUserIds */
  const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId)

  /* Filtre des utilisateurs correspondants au genre souhaiter de l'utilisateur actuel */
  const filteredGenderedUsers = genderedUsers?.filter(genderedUser => !matchedUserIds.includes(genderedUser.user_id))




      /*La condition {user && ...} vérifie si l'utilisateur est authentifié et affiche la section suivante si c'est le cas.*/
/*La balise {filteredGenderedUsers?.map((genderedUser) => ...)} permet de boucler à travers les profils filtrés et de retourner une carte Tinder pour chaque profil.*/

  return (
    <>
      {user &&
        <div className="dashboard">
          <EditLeft user={user} />

          <div className="swipe-container">
            <div className="nav-home">

            </div>
            <div className="card-container">
            <div className='send-direct'>
            <h1 className='posision'>Next</h1>
                 <Icon className='icon-left' name='arrow left' />
                 <Icon className='icon-right'  name='arrow right' />
            <h1 className='posicion'>Matches</h1>                
             </div>

              {filteredGenderedUsers?.map((genderedUser) =>
          <TinderCard
          className="swipe"
          key={genderedUser.user_id}
          onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
          onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
        >
          <div className="card-container">
            <div
              style={{ backgroundImage: "url(" + genderedUser.url + ")" }}
              className="card"
            >
              <h3>{genderedUser.first_name}</h3>
            </div>
          </div>
        </TinderCard>
              )}
              <div className="swipe-info">
                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
              </div>
              <div>
                
              </div>
            </div>

          </div>
          <ChatContainer user={user} />

        </div>}
    </>
  )
}

export default HomePage
