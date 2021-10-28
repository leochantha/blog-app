import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "../App.css";

const baseURL = "http://10.0.0.2:3000/";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [userInfo, setUserInfo] = useState("")

    const confirmLogin = () => {
        try {
            Axios.post(`${baseURL}api/signin`, { email: email, passowrd: password }).then(response => setUserInfo(response.data));
            if(userInfo.data.success){
                <Link to="/mainpage" className="btn btn-primary">Login</Link>
            }
        }
        catch (error) {
            console.log(error)
        }

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
        </div >
    );

}