import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonIcon } from '@ionic/react';
import { personCircleOutline, lockClosedOutline } from 'ionicons/icons';
import './css/Login.css'; // Import custom CSS for styling
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const token = Cookies.get('token');
  // alert("token login: "+token);
  if(token) history.push('/home');

  const handleLogin = () => {
    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => {
        if (response.ok) return response.json();
        else {
          // Handle login error
          throw new Error('Login failed');
        }
      })
      .then(data => {
        const token = data.token;
        // alert(token);
        console.log(token);
        // Store the token in a cookie
        Cookies.set('token', token, { expires: 7 });
        history.push('/home');
      })
      .catch(err => {
        alert(err);
      });
  };

  return (
    <div className="login-container">
      <img className='logo' src="assets/usmba.png" alt="" />
      <form className="login-form">
        <h1 className="login-title">Login</h1>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="login-input"
        />
        <button
          type="button"
          onClick={handleLogin}
          className="login-button"
        >
          Log In
        </button>
        <p>Have not an account? <a href="/register">Register</a></p>
      </form>
    </div>
  );
}

export default Login;
