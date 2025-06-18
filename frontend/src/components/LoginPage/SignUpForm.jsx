import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setLoading(true);

  //   const formData = new FormData();
  //   formData.append('email', email);
  //   formData.append('password', password);
  //   formData.append('userName', userName);
  //   if (avatar) {
  //     formData.append('avatar', avatar);
  //   }

  //   try {
  //     const response = await fetch('http://localhost:5000/api/v1/auth/register', {
  //       method: 'POST',
  //       body: formData
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.message || data.msg || 'Registration failed');
  //     }

  //      localStorage.setItem('token', data.token);
       
  //     setEmail('');
  //     setPassword('');
  //     setUserName('');
  //     setAvatar(null);

  //     navigate('/signin');
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  formData.append('userName', userName);
  if (avatar) {
    formData.append('avatar', avatar);
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/register`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.msg || 'Registration failed');
    }

    localStorage.setItem('token', data.token);

    setEmail('');
    setPassword('');
    setUserName('');
    setAvatar(null);

    navigate('/signin');
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <form className="account-form" onSubmit={handleSubmit}>
      <div className="account-form-fields sign-up">
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
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <input
          id="avatar"
          name="avatar"
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
        {/* Optional: Avatar preview */}
        {avatar && (
          <img
            src={URL.createObjectURL(avatar)}
            alt="Avatar Preview"
            style={{
              width: "80px",
              height: "80px",
              marginTop: "10px",
              borderRadius: "50%",
              objectFit: "cover"
            }}
          />
        )}
      </div>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      <div id="subbtn">
        <button className="btn-submit-form" type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
