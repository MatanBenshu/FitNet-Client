import './rightbar.css';
import { AuthContext } from '../../context/authContext/AuthContext';
import { GroupContext } from '../../context/groupContext/GroupContext';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GroupForm from '../popUpForms/groupForm/groupForm';
import axios from '../../Api';
import {Divider,Chip} from '@mui/material';
import Friend from '../friend/Friend';

export default function RightbarGroup () {

    const [showFormGroup, setShowFormGroup] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {Admin,group,groupDispatch} = useContext(GroupContext);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    console.log(group);

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

    async function handleAcceptWait (u){
        try{
            await axios.put(`/groups/join/${group._id}`,{userId: u});
            await axios.put(`/groups/unwaiting/${group._id}`,{userId: u});
            groupDispatch({type: 'APPROVED_WAITING', payload: u});
        }catch(err){

        }
    };

    async function handleDeclineWait (u){
        try{
            await axios.put(`/groups/unwaiting/${group._id}`,{userId: u});
            groupDispatch({type: 'REMOVE_WAITING', payload: u});
        }catch(err){

        }
    };
    

    return (<>
        {showFormGroup ? <GroupForm toggle={togglePopGroup} /> : null}
        <div className="rightbar">
            <div className="rightbarWrapper">
                <div className='AdminContainer'>
                    <div className='ownerContainer'>
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
                {(user._id===Admin._id && group.type === 'private') &&
                    <div>
                        <Divider style = {{marginBottom:10}}>
                            <Chip  label="Waiting List"/>
                        </Divider>
                        {group.waiting && !group.waiting.length? <p className='NoContent' >Waiting list empty!</p> :
                            <ul className='groupWaitingList'>
                                {group.waiting.map((u) => (
                                    <div className='WaitingUser' key={u}>
                                        <Friend className='WaitUserPicName' participant={u} />
                                        <button className='WaitButton' onClick={()=>handleAcceptWait(u)}>Accept</button>
                                        <button className='WaitButton' onClick={()=>handleDeclineWait(u)}>Decline</button>
                                    </div>
                                ))}
                            </ul>}
                    </div>}
            </div>
        </div>
    </>
    );
}