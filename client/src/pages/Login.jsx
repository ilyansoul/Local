import React from 'react';
import '../components/styles/login.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cookies, setCookie] = useCookies(['AuthToken', 'UserId']);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      setCookie('AuthToken', response.data.token);
      setCookie('UserId', response.data.userId);

      const success = response.status === 201;
      if (success) navigate('/homepage');
      if (!success) navigate('/acceuil');
    } catch (error) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="front">
      <form onSubmit={handleSubmit}>
        <div class="box">
          <div class="form">
            <h2>Connexion</h2>
            <div class="inputBox">
              <input
                type="string"
                name="email"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span>Email</span>
              <i></i>
            </div>
            <div class="inputBox2">
              <input
                type="password"
                name="password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>Mot de passe</span>
              <i></i>
            </div>

            <div class="links">
              <a href="/">Mot de passe oublie?</a>
              <a href="/">Inscription</a>
            </div>
            <input className="btn-login" type="submit" />
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;