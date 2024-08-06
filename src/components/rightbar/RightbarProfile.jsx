import './rightbar.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove,Edit } from '@mui/icons-material';
import Moment from 'react-moment';
import EditUserInfoForm from '../editUserInfoForm/EditUserInfoForm';

export default function Rightbar({ user ,infoUpdated}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));
    const [showEditForm, setShowEditForm] = useState(false);

    

    function togglePopEdit () {
        infoUpdated();
        setShowEditForm(!showEditForm);
        console.log(currentUser);
    };

    useEffect(() => {
        if (currentUser.followings.includes(user?._id)){
            setFollowed(true);
        }
        const getFriends = async () => {
            if (user) {
                try {
                    const friendList = await axios.get('/users/friends/' + user._id);
                    setFriends(friendList.data);
                } catch (err) {
                    console.log(err);
                }
            }
        };
        getFriends();
    }, [user,currentUser]);

    const handleClick = async () => {
        try {
            if (followed) {
                await axios.put(`/users/${user._id}/unfollow`, {
                    userId: currentUser._id,
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
            if(err.status === 403){
                setFollowed(!followed);
            }
            
        }
    };

    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src="assets/gift.png" alt="" />
                    <span className="birthdayText">
                        <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
                    </span>
                </div>
                <img className="rightbarAd" src="assets/ad.png" alt="" />
                <h4 className="rightbarTitle">Online Friends</h4>
            </>
        );
    };

    const ProfileRightbar = () => {
        return (
            <>
                {showEditForm ? <EditUserInfoForm toggle={togglePopEdit} /> : null}
                {user.username !== currentUser.username && (
                    <button className="rightbarFollowButton" onClick={handleClick}>
                        {followed ? 'Unfollow' : 'Follow'}
                        {followed ? <Remove /> : <Add />}
                    </button>
                )}
                <div className='titleContainer'>
                    <span className="rightbarTitle">User information</span>
                    {user._id===currentUser._id && <Edit className='editButton' onClick={togglePopEdit}/>}
                </div>
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
                        <Moment className="rightbarInfoValue" format=" Do MMMM YYYY" date={user.birthDate}/>
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
                <h4 className="rightbarTitle">User statistic</h4>
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