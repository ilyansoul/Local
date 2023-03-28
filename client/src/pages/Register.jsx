import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import '../components/styles/register.css';
import Logo from '../components/logo.png';



const Register = () => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const [ cookies, setCookie, removeCookie] = useCookies(null)

    let navigate = useNavigate()

    console.log(email, password, confirmPassword)




    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if ( password !== confirmPassword) {
                setError('Passwords need to match!')
                return
            }

            const response = await axios.post('http://localhost:5000/signup', { email, password })
            
            setCookie('AuthToken', response.data.token)
            setCookie('UserId', response.data.userId)

            const success = response.status === 201
            if (!success) navigate ('/acceuil')
            if (success) navigate ('/onboarding')

            window.location.reload()

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="page">
                    <img className='logo-register' src={Logo} alt="" />

        <div className="container">
    <div class="header">Inscription</div>

            <form onSubmit={handleSubmit}>
            <div className='container'>
                <div class="field input-field">

                <input 
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div class="field input-field">

                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Mot de passe"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <div class="field input-field">

                <input
                   className='text'
                    type="password"
                    id="password-check"
                    name="password-check"
                    placeholder="Confirmation mot de passe"
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                </div>
                <input className="register-submit" type="submit"/>
                <div class="form-link sign-up">
        <span className='f'>Deja un compte  ?      </span> 
        <a className='already' href="/login">Connecte toi</a>
      </div>

                
                <p>{error}</p>
                </div>
            </form>

            <hr/>

        </div>
        </div>
    )
}
export default Register
