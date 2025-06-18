import React, { useState } from 'react';
import "./Signin.css";
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch('http://localhost:5000/api/v1/auth/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ userName, password })
  //     });

  //     if (!response.ok) {
  //       throw new Error('Login failed');
  //     }

  //     const data = await response.json();

  //     if (data.token) {
  //       localStorage.setItem('token', data.token);
  //       console.log('Login successful');
  //       navigate('/home/bookmark');
  //     } else {
  //       throw new Error('Token not received');
  //     }

  //   } catch (error) {
  //     console.error('Error during login:', error.message);
  //     alert('Login failed: ' + error.message);
  //   }
  // };


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userName, password })
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();

    if (data.token) {
      localStorage.setItem('token', data.token);
      console.log('Login successful');
      navigate('/home/bookmark');
    } else {
      throw new Error('Token not received');
    }

  } catch (error) {
    console.error('Error during login:', error.message);
    alert('Login failed: ' + error.message);
  }
};

  return (
    <form className="account-form" onSubmit={handleSubmit}>
      <div className="account-form-fields sign-in">
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div id="subbtn">
        <button className="btn-submit-form" type="submit">
          Sign in
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
