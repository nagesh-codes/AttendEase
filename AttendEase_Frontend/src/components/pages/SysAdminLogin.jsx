import React from 'react'
import logo from '../../assets/logo.png'
import '../css-files/SysAdminLogin.css'
import { useState } from 'react'
import { apiClient } from '../../API/apiClient';
import { toast } from 'react-toastify';

const SysAdminLogin = () => {
    const [otp, setOtp] = useState('');
    const [otpsent, setOtpsent] = useState(false);
    const [btntxt,setBtntxt] = useState('Verify');
    const [isdisable,setIsdisable] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const sendOTP = async () => {
        setOtpsent(true);
        try {
            const response = await apiClient.post("/api/email/sendotp");
            toast.success('OTP Successfully Sent');
        } catch (error) {
            console.error(error);
            toast.error('Failed to Send OTP');
        }
    }

    return (
        <div className="sys-login">
            <form className="wrapper" onSubmit={handleSubmit}>
                <div className="logo">
                    <img src={logo} alt="logo" />
                    AttendEase
                </div>
                <div className="title">System Admin Login</div>
                <div className={`input-field ${otpsent ? 'hide' : ''}`}>
                    <button type="button" onClick={sendOTP}>Send OTP On Email</button>
                </div>
                <div className={`rem-box ${otpsent ? '' : 'hide'}`}>
                    <label htmlFor="otp">Enter Your OTP</label>
                    <input type="text" value={otp} onInput={e => setOtp(e.target.value)} required id='otp' />
                </div>
                <div className={`btn-field ${otpsent ? '' : 'hide'}`}>
                    <button type='submit' disabled={isdisable}>{btntxt}</button>
                </div>
            </form>
        </div>
    )
}

export default SysAdminLogin
