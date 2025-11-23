import React from 'react'
import '../css-files/Signup.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className='SignupPage'>
            <form className="wrapper" onSubmit={handleSubmit}>
                <div className="logo">
                    AttendEase
                </div>
                <div className="title">Signup</div>
                <div className="input-field">
                    <label htmlFor="name">Enter Your Name</label>
                    <input type="text" value={name} onInput={e => setName(e.target.value)} required id='name' />
                </div>
                <div className="input-field">
                    <label htmlFor="email">Enter Your Email Address</label>
                    <input type="email" value={email} onInput={e => setEmail(e.target.value)} required id='email' />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Enter Your Password</label>
                    <input type="password" value={password} onInput={e => setPassword(e.target.value)} required id='password' />
                </div>
                <div className="btn-field">
                    <button type='submit'>Sign Up</button>
                </div>
                <div className="footer">
                    Already Have An Account? <Link to={"/"}>Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Signup
