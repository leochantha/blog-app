import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { Link } from "react-router-dom";
import "../App.css";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const confirmLogin = () => {
        Axios.post('http://10.0.0.2:3000/api/test', { email: email, passowrd: password })
    };
    return (
        <div className="LogAndReg">
            <div className="LoginPage">
                <h2>NiceBlog</h2>
                <label>enter your email</label>
                <input type="text" onChange={(e) => { setEmail(e.target.value); }} />
                <label>enter your password</label>
                <input type="text" onChange={(e) => { setPassword(e.target.value); }} />
                <button onClick={confirmLogin}>Login</button>
                <div className="goToRegister">
                    <div>
                        <Link to="/Register" className="btn btn-primary">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    );

}