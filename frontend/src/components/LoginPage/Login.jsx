import React, { useState } from "react";
import Form from "./Form";
import "./Login.css";
import logo from "../../assets/images/zcoderlogo.png";

const Login = () => {
  const [option, setOption] = useState(1); 

  const renderHeaderText = () => {
    switch (option) {
      case 1:
        return "Sign in to your account";
      case 2:
        return "Create an account";
      case 3:
        return "Reset your password";
      default:
        return "";
    }
  };

  return (
    <div className="out">
      <div className="logo">
        <img
          src={logo}
          alt="ZCoder Logo"
          width={208}
          height={96}
        />
      </div>

      <div id="login">
        <div className="container">
          <header>
            <div className="header-headings">
              <span>{renderHeaderText()}</span>
            </div>
          </header>

          <Form option={option} setOption={setOption} />

          <section>
            <div className="section-headings">
              <div className="options bottomline">
                {option !== 2 && (
                  <span onClick={() => setOption(2)}>
                    Don't have an account? Get started here
                  </span>
                )}
                {option !== 1 && (
                  <span onClick={() => setOption(1)}>
                    Already a member? Log In here
                  </span>
                )}
                {option !== 3 && (
                  <span onClick={() => setOption(3)}>
                    Forgot your password?
                  </span>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;
