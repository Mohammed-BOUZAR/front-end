import React, { useState } from 'react';
import { IonContent } from '@ionic/react';
import { personCircleOutline, lockClosedOutline } from 'ionicons/icons';
import './css/Register.css'; // Import custom CSS for styling
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [state, setState] = useState('');
  // const [profile, setProfile] = useState('');
  const [department, setDepartment] = useState('');
  const [cin, setCin] = useState('');
  const [cne, setCne] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  const history = useHistory();
  const token = Cookies.get('token');
  // alert("token register: "+token);
  if (token) history.push('/home');

  const handleRegister = () => {
    // Implement registration logic here
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Date of Birth:', dateOfBirth);
    console.log('State:', state);
    // console.log('Profile:', profile);
    console.log('Department:', department);
    console.log('CIN:', cin);
    console.log('CNE:', cne);
    console.log('Password:', password);

    fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstName, lastName, email, dateOfBirth, state, cin, cne, password })
    })
      .then(response => {
        if (response.ok) return history.push('/login');
        else {
          // Handle login error
          throw new Error('Login failed');
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  return (
    <div className="register-container">
      <form className="register-form">
        <h1 className="register-title">Register</h1>
        <input
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          placeholder="First Name"
          className="register-input"
        />
        <input
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          placeholder="Last Name"
          className="register-input"
        />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="register-input"
        />
        <input
          type="date"
          value={dateOfBirth}
          onChange={e => setDateOfBirth(e.target.value)}
          placeholder="Date of Birth"
          className="register-input"
        />
        <input
          type="text"
          value={state}
          onChange={e => setState(e.target.value)}
          placeholder="State"
          className="register-input"
        />
        {/* <input
          type="text"
          value={profile}
          onChange={e => setProfile(e.target.value)}
          placeholder="Profile"
          className="register-input"
        /> */}
        <input
          type="text"
          value={department}
          onChange={e => setDepartment(e.target.value)}
          placeholder="Department"
          className="register-input"
        />
        <input
          type="text"
          value={cin}
          onChange={e => setCin(e.target.value)}
          placeholder="CIN"
          className="register-input"
        />
        <input
          type="text"
          value={cne}
          onChange={e => setCne(e.target.value)}
          placeholder="CNE"
          className="register-input"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="register-input"
        />
        <button
          type="button"
          onClick={handleRegister}
          className="register-button"
        >
          Register
        </button>
        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default Register;