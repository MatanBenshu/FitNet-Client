import { useContext, useEffect, useState } from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export default function Feed({ username }) {
    const [render,reRender] = useState(0);
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);

    function handleReRenderFeed ()  {
        reRender(perv =>perv +1);
    };


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = username
                    ? await axios.get('/posts/profile/' + username)
                    : await axios.get('posts/timeline/' + user._id);
                setPosts(
                    res.data.sort((p1, p2) => {
                        return new Date(p2.createdAt) - new Date(p1.createdAt);
                    })
                );    
            } catch (error) {
                
            }
        };
        fetchPosts();
    }, [username, user._id,render]);

    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username) && <Share handler={handleReRenderFeed}/>}
                {posts.map((p) => (
                    <Post key={p._id} post={p} handler={handleReRenderFeed} />
                ))}
            </div>
        </div>
    );
}
