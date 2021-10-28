import React, { useEffect, useState } from "react";
import Axios from 'axios';
import "../App.css";

export default function CreatePost() {

    const [username, setUserName] = useState("")
    const [title, setTitle] = useState("")
    const [post, setPost] = useState("")

    //cors maybe!!
    const submitPost = () => {
        Axios.post('http://10.0.0.2:3000/api/?', { username: username, title: title, post: post })
    };

    return (
        <div>
            <div className="navbar">
                <div className="links">
                    <a href="/mainpage">Main Page</a>
                    <a href="/createpost">Create Post</a>
                </div>
                <div className="logout">
                    <a href="/">Logout</a>
                </div>
            </div>
            <div className="CreatePost">
                <div className="uploadPost">
                    <label>Username</label>
                    <input type="text" onChange={(e) => { setUserName(e.target.value); }} />
                    <label>Title</label>
                    <input type="text" onChange={(e) => { setTitle(e.target.value); }} />
                    <label>Post Text</label>
                    <textarea onChange={(e) => { setPost(e.target.value); }} />
                    <button onClick={submitPost}>Submit Post</button>
                </div>
            </div>
        </div>
    );
}