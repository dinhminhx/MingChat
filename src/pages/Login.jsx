import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {

  const navigate = useNavigate();
  const [error,setError] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch (error) {
      setError(true)
    }
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Ming Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="file" id="file" style={{display: 'none'}} />
          <button>Login</button>
          {error && <span>Something Wrong Here ?</span>}
        </form>
        <p>You don't have account ? <Link to="/register">Sign up here</Link></p>
      </div>
    </div>
  )
}

export default Login