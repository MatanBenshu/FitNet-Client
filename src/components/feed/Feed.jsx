import { useContext, useEffect, useState } from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
import axios from '../../Api';
import { AuthContext } from '../../context/authContext/AuthContext';
import { GroupContext } from '../../context/groupContext/GroupContext';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {Favorite, ThumbUp,PersonPin} from '@mui/icons-material';
import { pink } from '@mui/material/colors';

export default function Feed({ username,updateCurrentUser,updateRightBar }) {
    const [render,reRender] = useState(0);
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);
    const [value, setValue] = useState(0);

    function handleReRenderFeed ()  {
        reRender(perv =>perv +1);
        if (updateRightBar){ updateRightBar();}
       
    };
    function handleChange (event,newValue)  {
        setValue(newValue);
    };


    useEffect(() => {
        const fetchPosts = async () => {

            try {
                let res; 
                if(!username){
                    res = await axios.get('posts/timeline/' + user._id);
                }else if(username !== user.username)
                {
                    res = await axios.get('/posts/profile/' + username);
                }else{
                    switch(value){
                    case 0:
                        res = await axios.get('/posts/profile/' + username);
                        break;
                    case 1:
                        res = await axios.get('/posts/likes/' + username);
                        break;
                    case 2:
                        res = await axios.get('/posts/saved/' + username);
                        break;
                    default:
                        res = await axios.get('/posts/timeline/' + username);
                        break;
                    }
                }
                setPosts(
                    res.data.sort((p1, p2) => {
                        return new Date(p2.createdAt) - new Date(p1.createdAt);
                    })
                );    
            } catch (error) {
                
            }
        };

        fetchPosts();
    }, [username, user,render,updateCurrentUser,value]);

    return (
        <div className="feed">
            <div className="feedWrapper">
                {(username)&&(username===user.username)&&
                <div className='TabsContainer'>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        centered
                    >
                        <Tab icon={<PersonPin color="success" />}  iconPosition="bottom" label="Created" />
                        <Tab  icon={<ThumbUp color="primary"/>} iconPosition="bottom" label="Liked" />
                        <Tab icon={<Favorite sx={{ color: pink[500] }} />} iconPosition="bottom" label="Saved" />
                    </Tabs>

                </div>}
                {(!username) && <Share handler={handleReRenderFeed}/>}
                {!(posts && posts.length)? <p className='NoContent'> No content to show </p> :
                    <>{posts.map((p) => (
                        <Post key={p._id} post={p} handler={handleReRenderFeed} updateCurrentUser={updateCurrentUser} />
                    ))}</>}
            </div>
        </div>
    );
}



export  function FeedGroup() {
    const [render,reRender] = useState(0);
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);
    const { group } = useContext(GroupContext);

    function handleReRenderFeed ()  {
        console.log('Rendering Feed Group');  
        reRender(perv =>perv +1);
        console.log(render);
    };


    useEffect(() => {
        const fetchPosts = async () => {

            try {
                const  res = await axios.get('groups/content/' + group._id);
                console.log(res.data); 
                setPosts(
                    res.data.sort((p1, p2) => {
                        return new Date(p2.createdAt) - new Date(p1.createdAt);
                    })
                );    
            } catch (error) {
                
            }
        };

        fetchPosts();
    }, [render,group]);

    return (
        <div className="feed">
            <div className="feedWrapper">
                <div className='GroupNameAndDescription'>
                    <h1 className='groupNameTitle'>{group.groupname}</h1>
                    <p className='groupDescription'>{group.desc}</p>
                </div>
                {(group.followers.includes(user._id)) ? 
                    <>
                        <Share handler={handleReRenderFeed}/>
                        {!(posts && posts.length)? <p className='NoContent'> No content to show yet! </p> :
                            <>{posts.map((p) => (
                                <Post key={p._id} post={p} handler={handleReRenderFeed} />
                            ))}</>}
                    </> 
                    : <p className='NoContent'> Please join the group to see the content. </p>} 
            </div>
        </div>
    );
}

