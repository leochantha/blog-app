import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { Link } from "react-router-dom";
import "../App.css";


export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [username, setUsername] = useState("")

    const confirmRegister = () => {
        if (password === passwordConfirm) {
            Axios.get('http://10.0.0.2:3000/api/test', { username: username, email: email, passowrd: password })
        }
    };
    return (
        <div className="LogAndReg">
            <div className="MainPage">
                <div className="LoginPage">
                    <label>enter your username</label>
                    <input type="text" onChange={(e) => { setUsername(e.target.value); }} />
                    <label>enter your email</label>
                    <input type="text" onChange={(e) => { setEmail(e.target.value); }} />
                    <label>enter your password</label>
                    <input type="text" onChange={(e) => { setPassword(e.target.value); }} />
                    <label>confirm your password</label>
                    <input type="text" onChange={(e) => { setPasswordConfirm(e.target.value); }} />
                    <button onClick={confirmRegister}>Register</button>
                    <div className="goToRegister">
                    <div>
                        <Link to="/" className="btn btn-primary">Sign in</Link>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );

}