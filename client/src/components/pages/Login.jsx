import React from 'react'
import '../css-files/Login.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className='LoginPage'>
            <form className="wrapper" onSubmit={handleSubmit}>
                <div className="logo">
                    AttendEase
                </div>
                <div className="title">Login</div>
                <div className="input-field">
                    <label htmlFor="email">Enter Your Email Address</label>
                    <input type="email" value={email} onInput={e => setEmail(e.target.value)} required id='email' />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Enter Your Password</label>
                    <input type="password" value={password} onInput={e => setPassword(e.target.value)} required id='password' />
                </div>
                <div className="rem-box">
                    <input type="checkbox" id="rem" />
                    <label htmlFor="rem"> Remember Me</label>
                </div>
                <div className="btn-field">
                    <button type='submit'>Login</button>
                </div>
                <div className="footer">
                    Don't Have Any Account? <Link to={"/signup"}>Signup</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
