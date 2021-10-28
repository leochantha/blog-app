import { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Post() {
    let { postId } = useParams();
    const [post, setPost] = useState({});
    useEffect(() => {
        Axios.get(`http://10.0.0.2:3000/api/getIdPost?/${postId}`).then((data) => {
            setPost({ title: data.data[0].title, postText: data.data[0].post, username: data.data[0].username })
        })
    }, []);
    return (
        <div>
            <div className="navbar">
                <div className="links">
                    <a href="/mainpage">Main Page</a>
                    <a href="/createpost">Create Post</a>
                </div>
            </div>
            <div className="individualPost">
                <div className="Post inidividual">
                    <h1>{post.title}</h1>
                    <p>{post.post}</p>
                    <h4>{post.user}</h4>
                </div>
            </div>
        </div>
    )
}