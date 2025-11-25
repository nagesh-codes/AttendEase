import React from 'react'
import '../css-files/Signup.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { apiClient } from '../../apiClient'


const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rpassword, setRpassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password != rpassword) {
            alert("password does not matched");
            return;
        }
        try {
            const response = await apiClient.post("/api/auth/signup", { email, password,username:name })
                .then(() => {
                    alert('user created');
                })
        } catch (er) {
            console.log(er);
            alert('duplicate username or the email has already taken');
        }
    }

    return (
        <div className='SignupPage'>
            <form className="wrapper" onSubmit={handleSubmit}>
                <div className="logo">
                    <img src={logo} alt="logo" />
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
                <div className="input-field">
                    <label htmlFor="rpassword">Re-Type Your Password</label>
                    <input type="password" value={rpassword} onInput={e => setRpassword(e.target.value)} required id='rpassword' />
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
