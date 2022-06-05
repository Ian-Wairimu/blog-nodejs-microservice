import React, {useState, useEffectm, useEffect} from "react";
import axios from "axios";
import CommentCreate from "./commentCreate";


export default () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:3010/posts');

        setPosts(res.data);
    };
    useEffect(() => {
        fetchPosts();
    }, [])

    const renderedPost = Object.values(posts).map(post => {
        return <div className="card" style={{
            width: "30%",
            marginBottom: "20px"
        }} key={post.id}>
            <div className="card-body">
                <h3>{post.title}</h3>
                <CommentCreate />
            </div>
        </div>;
    })

    return (
        <div className='d-flex flex-row flex-wrap justify-content-between'>
            {renderedPost}
        </div>
    );
}