import React, { useEffect } from 'react'
import '../css-files/Login.css'
import logo from '../../assets/logo.png'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { apiClient } from '../../API/apiClient'
import { toast } from 'react-toastify';
import { setCookie } from '../../other_func/setCookies'
import { getCookie } from '../../other_func/getCookies'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(true);
    const [Remember, setRemember] = useState(false);
    const [isdisable, setIsdisable] = useState(false);
    const [btntxt, setBtntxt] = useState("Login");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsdisable(true);
        setBtntxt("Checking...");
        try {
            const response = await apiClient.post("/api/auth/login", { email, password, username: name })
            if (response.status === 201) {
                if (Remember) {
                    setCookie('email', email, 10);
                    setCookie('password', password, 10);
                }
                toast.success("Successfully Login!");
                navigate("/dashboard");
            }
        } catch (er) {
            toast.error("Combination of email and password is not valid!");
        }
        setBtntxt("Login");
        setIsdisable(false);
    }

    return (
        <div className='LoginPage'>
            <form className="wrapper" onSubmit={handleSubmit}>
                <div className="logo">
                    <img src={logo} alt="logo" />
                    AttendEase
                </div>
                <div className="title">Login</div>
                <div className="input-field">
                    <label htmlFor="email">Enter Your Email Address</label>
                    <input type="email" value={email} onInput={e => setEmail(e.target.value)} required id='email' />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Enter Your Password</label>
                    <div>
                        <input type={show ? "password" : "text"} value={password} onInput={e => setPassword(e.target.value)} required id='password' />
                        <span onClick={e => setShow(!show)}> {show ? <FaEyeSlash /> : <FaEye />} </span>
                    </div>
                </div>
                <div className="rem-box">
                    <input type="checkbox" id="rem" />
                    <label htmlFor="rem" onClick={() => { setRemember(!Remember) }}> Remember Me</label>
                </div>
                <div className="btn-field">
                    <button type='submit' disabled={isdisable}>{btntxt}</button>
                </div>
                <div className="footer">
                    Don't Have Any Account? <Link to={"/signup"}>Signup</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
