import './rightbar.css';
import { useContext, useEffect, useState } from 'react';
import axios from '../../Api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext/AuthContext';
import { Add, Remove,Edit } from '@mui/icons-material';
import Moment from 'react-moment';
import EditUserInfoForm from '../popUpForms/editUserInfoForm/EditUserInfoForm';
import ChangePasswordForm from '../popUpForms/changePasswordForm/ChangePasswordForm';
import DeleteAccountForm from '../popUpForms/deleteAccountForm/DeleteAccountForm';

export default function Rightbar({ user ,infoUpdated,someUpdate}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const [statistic, setStatistic] = useState({});
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));
    const [showEditForm, setShowEditForm] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    function togglePopEdit () {
        infoUpdated();
        setShowEditForm(!showEditForm);
    };

    function togglePopPassword () {
        setShowPasswordForm(!showPasswordForm);
    };

    function togglePopDeletion () {
        setShowDeleteForm(!showDeleteForm);
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
        const getStatistic = async () => {
            if (user) {
                try {
                    const statistic = await axios.get(`/users/statistic/${user._id}`);
                    setStatistic(statistic.data);
                    console.log(statistic.data);
                } catch (err) {
                    console.log(err);
                }
            }
        };
        getFriends();
        getStatistic();
    }, [user,currentUser,someUpdate]);

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

    const ProfileRightbar = () => {
        return (
            <>
                {showDeleteForm ? <DeleteAccountForm toggle={togglePopDeletion} /> : null}
                {showPasswordForm ? <ChangePasswordForm toggle={togglePopPassword} /> : null}
                {showEditForm ? <EditUserInfoForm toggle={togglePopEdit} /> : null}
                
                {user.username !== currentUser.username ? 
                    (
                        <button className="rightbarFollowButton" onClick={handleClick}>
                            {followed ? 'Unfollow' : 'Follow'}
                            {followed ? <Remove /> : <Add />}
                        </button>
                    ):(
                        <div className='deleteAndChangePasswordBtnsContainer'>
                            <button className="deleteProfileBtn" onClick={togglePopDeletion}>
                            Delete Account
                            </button>
                            <button className="ChangePasswordBtn" onClick={togglePopPassword }>
                            Change Password
                            </button>  
                        </div>  
                    )
                }
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
                <div className="rightbarStaticWrapper">
                    <div className='staticContainer'>
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">Friends: </span>
                            <span className="rightbarInfoValue">{statistic.followersCount} .</span>
                        </div>
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">Posts Created:</span>
                            <span className="rightbarInfoValue">{statistic.postsCount} .</span>
                        </div>
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">Posts Liked:</span>
                            <span className="rightbarInfoValue">{statistic.postsLiked} .</span>
                        </div>
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">Posts Saved:</span>
                            <span className="rightbarInfoValue">{statistic.postsSaved} .</span>
                        </div>
                    </div>
                    <div className='staticContainer'>
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">Events Created:</span>
                            <span className="rightbarInfoValue">{statistic.eventsCount} .</span>
                        </div>
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">Events Joined:</span>
                            <span className="rightbarInfoValue">{statistic.eventsJoined} .</span>
                        </div>
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">Groups Created:</span>
                            <span className="rightbarInfoValue">{statistic.groupsCount} .</span>
                        </div>
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">Groups Joined</span>
                            <span className="rightbarInfoValue">{statistic.groupsJoined} .</span>
                        </div>
                    </div>
                </div>
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    {friends.map((friend) => (
                        <Link 
                            key= {friend.username}
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
                <ProfileRightbar/>
            </div>
        </div>
    );
}