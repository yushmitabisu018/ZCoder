import React, { useState } from "react";
import "./Login.css";

const Form = ({ option, setOption }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (option === 2 && password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload =
      option === 2
        ? { email, password, userName } // register
        : option === 1
        ? { userName, password }       // login requires userName
        : { email };                   // forgot password

    const endpoint =
      option === 2
        ? "register"
        : option === 1
        ? "login"
        : "forgot-password";

    // try {
    //   const response = await fetch(
    //    `http://localhost:5000/api/v1/auth/${endpoint}`,
    //     {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(payload),
    //     }
    //   );

    //   const data = await response.json();

    //   if (!response.ok) throw new Error(data.message || "Request failed");

    //   if (endpoint === "login") {
    //     localStorage.setItem("token", data.token);
    //     alert("Login successful!");
    //     window.location.href = "/dashboard"; 
    //   } else if (endpoint === "register") {
    //     alert("Registration successful! Please log in.");
    //     setOption(1); 
    //   } else {
    //     alert("Check your email for reset instructions");
    //   }
    // } catch (err) {
    //   console.error("Error:", err.message);
    //   alert(err.message);
    // }


    try {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/${endpoint}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "Request failed");

  if (endpoint === "login") {
    localStorage.setItem("token", data.token);
    alert("Login successful!");
    window.location.href = "/dashboard";
  } else if (endpoint === "register") {
    alert("Registration successful! Please log in.");
    setOption(1);
  } else {
    alert("Check your email for reset instructions");
  }
} catch (err) {
  console.error("Error:", err.message);
  alert(err.message);
}

  };

  return (
    <form className="account-form" onSubmit={handleSubmit}>
      <div
        className={
          "account-form-fields " +
          (option === 1 ? "sign-in" : option === 2 ? "sign-up" : "forgot")
        }
      >
        {(option === 1 || option === 2) && (
          <input
            id="userName"
            name="userName"
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        )}

        {(option === 2 || option === 3) && (
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}

        {(option === 1 || option === 2) && (
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        )}

        {option === 2 && (
          <input
            id="repeat-password"
            name="repeatPassword"
            type="password"
            placeholder="Repeat Password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
        )}
      </div>

      <ul className="options">
        <li
          className={option === 1 ? "active" : ""}
          onClick={() => setOption(1)}
        >
          Sign in
        </li>
        <li
          className={option === 2 ? "active" : ""}
          onClick={() => setOption(2)}
        >
          Sign up
        </li>
        <li
          className={option === 3 ? "active" : ""}
          onClick={() => setOption(3)}
        >
          Forgot Password?
        </li>
      </ul>

      <div id="subbtn">
        <button className="btn-submit-form" type="submit">
          {option === 1
            ? "Sign in"
            : option === 2
            ? "Sign up"
            : "Reset password"}
        </button>
      </div>
    </form>
  );
};

export default Form;
