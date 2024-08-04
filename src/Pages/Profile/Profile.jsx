import React from 'react';
import NavBar from '../../components/navBar/navBar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
//import Rightbar from '../../components/rightbar/Rightbar';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import RightbarProfile from '../../components/rightbar/RightbarProfile';

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;
    const [clickFollowBtn, setFollowing] = useState(0);
    const navigate = useNavigate();
  
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/users?username=${username}`);
                setUser(res.data);
            } catch (error) {
                navigate('/page404');
            }
        };
        fetchUser();
    }, [username,navigate,clickFollowBtn]);
  
    return (
        <>
            <NavBar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={
                                    user.coverPicture
                                        ? PF + user.coverPicture
                                        : PF + 'person/noCover.png'
                                }
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={
                                    user.profilePicture
                                        ? PF + user.profilePicture
                                        : PF + 'person/noAvatar.png'
                                }
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <RightbarProfile user={user} handler={setFollowing} />
                    </div>
                </div>
            </div>
        </>
    );
}
