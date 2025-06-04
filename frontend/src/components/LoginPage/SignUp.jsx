import React from "react";
import SignUpForm from "./SignUpForm";
import "./Signin.css";
import zcoderlogo from "../../assets/images/zcoderlogo.png";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/signin");
  };

  return (
    <div className="out">
      <div className="logo">
        <img src={zcoderlogo} alt="Logo" width={208} height={96} />
      </div>
       <h1 className="coder">CODER</h1>
      <div id="login">
        <div className="container">
          <header>
            <div className="header-headings sign-up">
              <span>Create an account</span>
            </div>
          </header>
          <SignUpForm />
          <section>
            <div className="section-headings sign-up">
              <div className="options bottomline">
                <span onClick={clickHandler}>
                  Already a member? Log in here
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
