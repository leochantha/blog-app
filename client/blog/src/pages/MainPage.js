import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useHistory } from "react-router";
import "../App.css";

const baseURL = "http://10.0.0.2:3000/";

export default function MainPage() {

    const [postList, setPostList] = useState([]);
    let history = useHistory();

    useEffect(() => {
        try{
            Axios.get(`${baseURL}api/blog`).then((response) => {
                setPostList(response.data);
            });
        }catch(error){
            console.log(error)
        }
    }, []);
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
            <div className="MainPage">
                <div className="PostContainer">
                    {postList.map((val, key) => {
                        return (
                            <div className="Post" key={key} onClick={() => { history.push(`/post/${val.id}`) }}>
                                <h1>{val.title}</h1>
                                <p>{val.post.length > 500 ? val.post.substring(0, 250) + '...' : val.post}</p>
                                <h4>{val.user}</h4>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}