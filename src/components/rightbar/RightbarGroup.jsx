import './rightbar.css';
import { AuthContext } from '../../context/authContext/AuthContext';
import { GroupContext } from '../../context/groupContext/GroupContext';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GroupForm from '../popUpForms/groupForm/groupForm';
import axios from '../../Api';

export default function RightbarGroup () {

    const [showFormGroup, setShowFormGroup] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {Admin,group} = useContext(GroupContext);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    function togglePopGroup () {
        setShowFormGroup(!showFormGroup);
    };

    const HandleGroupDelete = async () => {
        if (window.confirm('Are you sure you want to delete your Group?')){
            try {
                await axios.delete(`/groups/${group._id}`);
                navigate('/');
            } catch (err) {
                console.error(err);
            }
        }
    };
    

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <div className='ownerContainer'>
                    {showFormGroup ? <GroupForm toggle={togglePopGroup} /> : null}
                    <h4 className='ownertag'>Admin:</h4>
                    <Link
                        to={'/profile/' + Admin?.username}
                        style={{ textDecoration: 'none' }}
                    >
                        <div className="rightbarFollowing">
                            <img
                                src={
                                    Admin?.profilePicture
                                        ? PF + Admin?.profilePicture
                                        : PF + 'person/noAvatar.png'
                                }
                                alt=""
                                className="rightbarFollowingImg"
                            />
                            <span className="rightbarFollowingName">{Admin?.username}</span>
                        </div>
                    </Link>
                </div>
                {user._id===Admin?._id && 
                <div className='ownerEventMenu'>
                    <button className='OwnerButtonDelete' onClick={HandleGroupDelete}>
                        Delete Group
                    </button>
                    <button className='OwnerButtonEdit' onClick={togglePopGroup}>
                        Edit Group
                    </button>
                </div>}
                
            </div>
        </div>
    );
}