import React from 'react'
import loginAssets from '../assets/login.png'
import '../styles/login.css'

const Login = () => {
  return (
    <div className='login-wrapper'>
      <div className="login-container">
        <div className="login-left">
          <img src={loginAssets} alt="" />
        </div>

        <div className="login-right">
          <div className="login-logo"></div>
          <h1>Welcome, Admin BCR</h1>

          <div className="login-input">
            <div className="email">
              <label htmlFor="">Email</label><br />
              <input type="email" placeholder='Contoh: johndee@gmail.com'/>
            </div>
            <div className="password">
              <label htmlFor="">Password</label><br />
              <input type="password" placeholder='6+ karakter'/>
            </div>
            <button>Sign In</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login