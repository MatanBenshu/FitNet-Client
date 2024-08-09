import './post.css';
import {Edit ,SaveAs,DeleteForever} from '@mui/icons-material';
import { useContext, useEffect, useState } from 'react';
import axios from '../../Api';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Badge from '@mui/material/Badge';
import { grey } from '@mui/material/colors';

export default function Post({ post ,handler,updateCurrentUser}) {
    const [save, setSave] = useState(post.savedBy.length);
    const [isSaved, setIsSaved] = useState(false);
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [PostDesc,setPostDesc] = useState(post?.desc);
    const [editMode, setEditMode] = useState(false);
    const { user: currentUser } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [srcUser, setSrcUser] = useState({});

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;


    useEffect(() => {
        setIsSaved(post.savedBy.includes(currentUser._id));
    }, [currentUser._id, post.savedBy]);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/users?userId=${post.userId}`);
                setUser(res.data);
            } catch (error) {       
            }
        };
        fetchUser();
    }, [post.userId,updateCurrentUser]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/users?userId=${post.srcUser}`);
                setSrcUser(res.data);   
            } catch (error) {
                
            }
        };
        if (post.srcUser){
            fetchUser();
        }
        
    }, [post.srcUser,updateCurrentUser]);

    const likeHandler = () => {
        if (currentUser._id !== post.userId) {
            try {
                axios.put('/posts/' + post._id + '/like', { userId: currentUser._id });
            } catch (err) {
                console.error(err);
            }
            setLike(isLiked ? like - 1 : like + 1);
            setIsLiked(!isLiked);
            handler();
        }
    };
    const savedHandler = () => {
        if (currentUser._id !== post.userId) {
            try {
                axios.put('/posts/' + post._id + '/save', { userId: currentUser._id });
            } catch (err) {
                console.error(err);
            }
            setSave(isSaved ? save - 1 : save + 1);
            setIsSaved(!isSaved);
            handler();
        }
    };
    const shareHandler = () => {
        if (currentUser._id !== post.userId && currentUser._id !== post.srcUser ) {
            let postId;
            try {
                if (!srcUser._id){
                    postId = post._id;
                }
                else{
                    postId = post.srcPostId;
                }
                axios.put('/posts/' + postId + '/share', { userId: currentUser._id });
                handler();
            } catch (err) {
                console.error(err);
            }
        }
        
    };

    const handleEdit = () => {
        if (currentUser._id === post.userId && !srcUser._id) {
            setEditMode(true);
        }
    };
    const handleSave = () => {
        if (!PostDesc.trim()) {
            alert('Please enter a description');
            return;
        }
        setEditMode(false);
        try {
            axios.put(`/posts/${post._id}`, { desc: PostDesc });
            handler();
        } catch (err) {
            console.error(err);
        }
            
        
    };

    const handleDelete = () => {
        if (currentUser._id === post.userId ) {
            if (window.confirm('Are you sure you want to delete this post?')) {
                try {
                    axios.delete(`/posts/${post._id}`,{userId: currentUser._id});
                } catch (err) {
                    console.error(err);
                } 
                //window.location.reload();
                handler(); 
            }
        }
    };
    


    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                            <img
                                className="postProfileImg"
                                src={
                                    user.profilePicture
                                        ? PF + user.profilePicture
                                        : PF + 'person/noAvatar.png'
                                }
                                alt=""
                            />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate"><Moment fromNow>{post.createdAt}</Moment></span>
                    </div>
                    <div className="postTopRight">
                        {editMode? <SaveAs className='postMenu' onClick={handleSave} />
                            :<Edit className='postMenu' onClick={handleEdit} />}
                    </div>
                </div>
                <hr className="headHr" />
                <div className="postCenter">
                    <div className="postSourceCenter">
                        {srcUser._id && <div className="postTopLeft"><Link to={`/profile/${srcUser.username}`}>
                            <img
                                className="postProfileImg"
                                src={
                                    srcUser.profilePicture
                                        ? PF + srcUser.profilePicture
                                        : PF + 'person/noAvatar.png'
                                }
                                alt=""
                            />
                        </Link>
                        <span className="postUsername">{srcUser.username}</span>
                        <span className="postDate"><Moment fromNow>{post.srcTimestamp}</Moment></span>
                        </div>}
                    </div>
                    <textarea 
                        id="description" 
                        className="postTextArea" 
                        value={PostDesc} 
                        readOnly={!editMode} 
                        onChange={(e) => setPostDesc(e.target.value)}
                    > 
                    </textarea>
                    <img className="postImg" src={PF + post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <Badge badgeContent={like} color={grey[500]} showZero>
                            <img
                                className="likeSaveShareIcon"
                                src={`${PF}like.png`}
                                onClick={likeHandler}
                                alt="like"
                            /></Badge>
                        <Badge badgeContent={save} color={grey[500]} showZero>
                            <img
                                className="likeSaveShareIcon"
                                src={`${PF}heart.png`}
                                onClick={savedHandler}
                                alt="save"
                            /></Badge>
                        <img
                            className="likeSaveShareIcon"
                            src={`${PF}share.png`}
                            onClick={shareHandler}
                            alt="share"
                        />
                    </div>
                    <div className="postBottomRight">
                        <DeleteForever className='postMenu' color='error' onClick={handleDelete}/>
                    </div>
                </div>
            </div>
        </div>
    );
}




