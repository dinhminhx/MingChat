import React from 'react'
const Login = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Ming Chat</span>
        <span className="title">Login</span>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="file" id="file" style={{display: 'none'}} />
          <button>Login</button>
        </form>
        <p>You don't have account ? Sign up here</p>
      </div>
    </div>
  )
}

export default Login