import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useParams } from "react-router";
import "../App.css";

const baseURL = "http://10.0.0.2:3000/";

export default function CreatePost() {

    let { userInfo } = useParams();
    const [title, setTitle] = useState("")
    const [post, setPost] = useState("")

    const submitPost = () => {
        try{
            Axios.post(`${baseURL}api/blog/${userInfo.data.username}`, { title: title, post: post })
        }catch(error){
            console.log(error);
        }
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