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
  
  const handleCardClick = () => {
    setShowAbout(true);
  };

  const userId = cookies.UserId

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

  useEffect(() => {
      getUser();
  }, [])

  useEffect(() => {
      if (user) {
          getGenderedUsers()
      }
  }, [user])
  
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

  const swiped = (direction, swipedUserId, swipedUser) => {
      if (direction === 'right') {
          updateMatches(swipedUserId)
      }
      setLastDirection(direction)
  }

  const outOfFrame = (name) => {
      console.log(name + ' left the screen!')
  }



  const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId)
  const filteredGenderedUsers = genderedUsers?.filter(genderedUser => !matchedUserIds.includes(genderedUser.user_id))

  

  console.log('filteredGenderedUsers ', filteredGenderedUsers)
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
              onDrop={handleCardClick}
            >
              <h3>{genderedUser.first_name}</h3>
            </div>
            <div className="about-container" style={{ display: ShowAbout ? 'block' : 'none' }}>
              <p className='aboutMe'>{genderedUser.about}</p>
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
