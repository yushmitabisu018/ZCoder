import React from "react";
import { useNavigate } from "react-router-dom";
import SignInForm from "./SignInForm";
import "./Signin.css";
import zcoderlogo from "../../assets/images/zcoderlogo.png";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="out">
      <div className="logo">
        <img src={zcoderlogo} alt="ZCoder Logo" width={208} height={96} />
      </div>
       <h1 className="coder">CODER</h1>
      <div id="login">
        <div className="container">
          <header>
            <div className="header-headings sign-in">
              <span>Sign in to your account</span>
            </div>
          </header>

          <SignInForm />

          <section>
            <div className="section-headings sign-in">
              <div className="options bottomline">
                <span onClick={() => navigate("/signup")}>
                  Don't have an account? Get started here
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
