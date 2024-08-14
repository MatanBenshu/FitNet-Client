import './sidebar.css';
import { useContext, useState } from 'react';
import { GroupContext } from '../../context/groupContext/GroupContext';
import { AuthContext } from '../../context/authContext/AuthContext';
import {PersonAdd,PersonRemove} from '@mui/icons-material';
import {Divider,Chip} from '@mui/material';
import Friend from '../friend/Friend';
import { useNavigate } from 'react-router-dom';

import axios from '../../Api';



export default function SideBarGroupPublic(){

    const {group,groupDispatch} = useContext( GroupContext);
    const { user } = useContext(AuthContext);
    const [isJoined, setIsJoined] = useState(group?.followers.includes(user?._id));


    const handleJoinGroup = async () => {
        try {
            if(!isJoined) {
                await axios.put('/groups/join/' + group._id ,{userId: user._id});
                groupDispatch({type: 'ADD_FOLLOWER', payload: user._id});
            }else{
                await axios.put('/groups/exit/' + group._id ,{userId: user._id});
                groupDispatch({type: 'REMOVE_FOLLOWER', payload: user._id});
            }
            setIsJoined(!isJoined);
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                {(user?._id !== group?.Admin) &&
                <>{isJoined? <button className="sidebarButtonExit"onClick={handleJoinGroup} >
                    <PersonRemove className="sidebarIcon" />
                    <span className="sidebarEventText">Leave</span>
                </button>:
                    <button className="sidebarButtonJoin" onClick={handleJoinGroup} >
                        <PersonAdd className="sidebarIcon" />
                        <span className="sidebarEventText">Join</span>
                    </button>}</>}
                <Divider className="sidebarHr" style = {{marginTop: 30,marginBottom:40}}>
                    <Chip  label="Members"/>
                </Divider>
                {group &&
                    <ul className="sidebarFriendList">
                        {group?.followers.map((u) => (
                            <Friend key={u} participant={u} />
                        ))}
                    </ul>}
                
            </div>
        </div>
    );

}



export function SideBarGroupPrivate(){

    const {group,groupDispatch} = useContext( GroupContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRemoveGroup = async () => {
        try {
            await axios.put('/groups/exit/' + group._id ,{userId: user._id});
            groupDispatch({type: 'REMOVE_FOLLOWER', payload: user._id});
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                {(user?._id !== group?.Admin) &&
                <button className="sidebarButtonExit"onClick={handleRemoveGroup } >
                    <PersonRemove className="sidebarIcon" />
                    <span className="sidebarEventText">Leave</span>
                </button>}
                <Divider className="sidebarHr" style = {{marginTop: 30,marginBottom:40}}>
                    <Chip  label="Members"/>
                </Divider>
                {group &&
                    <ul className="sidebarFriendList">
                        {group?.followers.map((u) => (
                            <Friend key={u} participant={u} />
                        ))}
                    </ul>}
                
            </div>
        </div>
    );



}