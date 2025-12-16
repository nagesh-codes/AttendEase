import React from 'react'
import logo from '../../assets/logo.png'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import '../css-files/Signup.css'
import { apiClient } from '../../API/apiClient';


const Signup = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role,setRole] = useState('Admin');
    const [password, setPassword] = useState('');
    const [rpassword, setRpassword] = useState('');
    const [show, setShow] = useState(true);
    const [rshow, setRshow] = useState(true);
    const [isdisable, setIsdisable] = useState(false);
    const [btntxt, setBtntxt] = useState("Signup");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password != rpassword) {
            alert("password does not matched");
            return;
        }
        setIsdisable(true);
        setBtntxt("Checking...");
        try {
            const response = await apiClient.post("/api/auth/signup", { email, password, username, name,role })
                .then(() => {
                    alert('user created');
                })
        } catch (er) {
            console.log(er);
            alert('duplicate username or the email has already taken');
        }
        setBtntxt("Signup");
        setIsdisable(false);
    }

    return (
        <div className='SignupPage'>
            <form className="wrapper" onSubmit={handleSubmit}>
                <div className="logo">
                    <img src={logo} alt="logo" />
                    AttendEase
                </div>
                <div className="title">Signup</div>
                <div className="div">
                    <div className="input-field">
                        <label htmlFor="name">Enter Your Name</label>
                        <input type="text" value={name} onInput={e => setName(e.target.value)} required id='name' />
                    </div>
                    <div className="input-field">
                        <label htmlFor="username">Create Your Username</label>
                        <input type="text" value={username} onInput={e => setUsername(e.target.value.trim())} required id='username' />
                    </div>
                </div>
                <div className="div">
                    <div className="input-field">
                        <label htmlFor="email">Enter Your Email Address</label>
                        <input type="email" value={email} onInput={e => setEmail(e.target.value)} required id='email' />
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Choose Your Role</label>
                        <select onInput={e => setRole(e.target.value)} value={role}>
                            <option value="Admin">Admin</option>
                            <option value="Teacher">Teacher</option>
                        </select>
                    </div>
                </div>
                <div className="div">
                    <div className="input-field">
                        <label htmlFor="password">Enter Your Password</label>
                        <div>
                            <input type={show ? "password" : "text"} value={password} onInput={e => setPassword(e.target.value)} required id='password' className='diff-padding' />
                            <span onClick={e => setShow(!show)}> {show ? <FaEyeSlash /> : <FaEye />} </span>
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="rpassword">Re-Type Your Password</label>
                        <div>
                            <input type={rshow ? "password" : "text"} value={rpassword} onInput={e => setRpassword(e.target.value)} required id='rpassword' className='diff-padding' />
                            <span onClick={e => setRshow(!rshow)}> {rshow ? <FaEyeSlash /> : <FaEye />} </span>
                        </div>
                    </div>
                </div>
                <div className="btn-field">
                    <button type='submit' disabled={isdisable}>{btntxt}</button>
                </div>
                <div className="footer">
                    Already Have An Account? <Link to={"/"}>Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Signup
