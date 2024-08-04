import './rightbar.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@mui/icons-material';

export default function Rightbar({ user ,handler}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id));
    const [Currentfriends, setCurrentFriends] = useState([]);
    
    console.log(user?._id);
    console.log(currentUser);

    useEffect(() => {
        setFollowed(currentUser.followings.includes(user?.id));
    }, [currentUser,user]);

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get('/users/friends/' + user._id);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err);
            }
        };
        getFriends();
    }, [user,followed]);

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get('/users/friends/' + currentUser._id);
                setCurrentFriends(friendList.data);
            } catch (err) {
                console.log(err);
            }
        };
        getFriends();
    }, [currentUser,followed]);

    const handleClick = async () => {
        try {
            if (followed) {
                await axios.put(`/users/${user._id}/unfollow`, {
                    userId:  currentUser._id,
                });
                dispatch({ type: 'UNFOLLOW', payload: user._id });
                
            } else {
                await axios.put(`/users/${user._id}/follow`, {
                    userId: currentUser._id,
                });
                dispatch({ type: 'FOLLOW', payload: user._id });
            }
            setFollowed(!followed);
        } catch (err) {
        }
    };

    const HomeRightbar = () => {
        return (
            <>
                <img className="rightbarAd" src= {PF + 'FitNetLogo.png'} alt="" />
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    {Currentfriends.map((friend) => (
                        <Link
                            to={'/profile/' + friend.username}
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="rightbarFollowing">
                                <img
                                    src={
                                        friend.profilePicture
                                            ? PF + friend.profilePicture
                                            : PF + 'person/noAvatar.png'
                                    }
                                    alt=""
                                    className="rightbarFollowingImg"
                                />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        );
    };

    const ProfileRightbar = () => {
        return (
            <>
                {user.username !== currentUser.username && (
                    <button className="rightbarFollowButton" onClick={handleClick}>
                        {followed ? 'Unfollow' : 'Follow'}
                        {followed ? <Remove /> : <Add />}
                    </button>
                )}
                <h4 className="rightbarTitle">User information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">First Name:</span>
                        <span className="rightbarInfoValue">{user.firstName}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Last Name:</span>
                        <span className="rightbarInfoValue">{user.lastName}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">BirthDay:</span>
                        <span className="rightbarInfoValue">{user.birthDate}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Gender:</span>
                        <span className="rightbarInfoValue">{user.gender}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Address:</span>
                        <span className="rightbarInfoValue">{user.address}</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    {friends.map((friend) => (
                        <Link
                            to={'/profile/' + friend.username}
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="rightbarFollowing">
                                <img
                                    src={
                                        friend.profilePicture
                                            ? PF + friend.profilePicture
                                            : PF + 'person/noAvatar.png'
                                    }
                                    alt=""
                                    className="rightbarFollowingImg"
                                />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        );
    };
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    );
}
