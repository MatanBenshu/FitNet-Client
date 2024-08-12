import React, { useEffect } from 'react';
import NavBar from '../../components/navBar/navBar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import { useNavigate  } from 'react-router-dom';
import './Profile.css';
import {  useState  } from 'react';
import { useParams } from 'react-router';
import axios from '../../Api';
import RightbarProfile from '../../components/rightbar/RightbarProfile';

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;
    const [updateCurrentUser, setupdateCurrentUser] = useState(false);
    const [information,setInformation] = useState(0);
    const navigate = useNavigate();

    function infoUpdated(){
        setupdateCurrentUser(!updateCurrentUser);
    }
    function someUpdated(){
        console.log('rendering some');
        setInformation(prev => prev + 1);
    };
    const handleDeleteUser = async () => {

        if (window.confirm('Are you sure you want to delete the profile? This action is irreversible.')) {
            try {
                const response = await axios.delete('/users/${user._id}?userId=${user._id}');//delete user
                if (response.status === 200) {
                    alert('The profile has been successfully deleted.');
                    // צריך להוסיף את ההתנתקות מהמערכת
                    navigate('/login');
                } else {
                    throw new Error('Failed to delete the profile');
                }
            } catch (error) {
                console.error('Error deleting the profile:', error);
                alert('Error deleting profile. Try again later.');
            }
        }
    };
  
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/users?username=${username}`);
                console.log(res.data);
                setUser(res.data);
            } catch (error) {
                navigate('/page404');
            }
        };
        fetchUser();
    }, [username,navigate,updateCurrentUser]);
  
    return (
        <>
            <NavBar />
            <div className="profile">
                <Sidebar updateRightBar={someUpdated} />
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
                            <button className="deleteProfileBtn" onClick={handleDeleteUser}>Delete profile</button>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} updateCurrentUser={updateCurrentUser} updateRightBar={someUpdated}  />
                        {user && <RightbarProfile user={user} infoUpdated={infoUpdated} someUpdate={information} />}
                    </div>
                </div>
            </div>
        </>
    );
}
