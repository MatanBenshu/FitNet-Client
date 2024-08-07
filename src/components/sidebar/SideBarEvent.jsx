import './sidebar.css';
import { useContext, useState } from 'react';
import { EventContext } from '../../context/eventContext/EventContext';
import { AuthContext } from '../../context/AuthContext';
import {PersonAdd,PersonRemove} from '@mui/icons-material';
import {Divider,Chip} from '@mui/material';
import Friend from '../friend/Friend';
import axios from 'axios';




export default function SidebarEvent() {
    const {event,eventDispatch} = useContext(EventContext);
    const { user } = useContext(AuthContext);
    const [isJoined, setIsJoined] = useState(event?.attendees.includes(user?._id));

    console.log(isJoined);

    const handleJoinEvent = async () => {
        try {
            const res = await axios.put('/events/' + event._id + '/attend',{userId: user._id});
            console.log(res.data); // Debugging purposes, remove this line in production!
            if(!isJoined) {
                eventDispatch({type: 'ADD_ATTENDEE', payload: user._id});
            }else{
                eventDispatch({type: 'REMOVE_ATTENDEE', payload: user._id});
            }
            setIsJoined(!isJoined);
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                {(user?._id !== event?.userId) &&
                <>{isJoined? <button className="sidebarButtonExit"onClick={handleJoinEvent} >
                    <PersonRemove className="sidebarIcon" />
                    <span className="sidebarEventText">Leave</span>
                </button>:
                    <button className="sidebarButtonJoin" onClick={handleJoinEvent} >
                        <PersonAdd className="sidebarIcon" />
                        <span className="sidebarEventText">Join</span>
                    </button>}</>}
                <Divider className="sidebarHr" style = {{marginTop: 30,marginBottom:40}}>
                    <Chip  label="Participants"  />
                </Divider>
                {event &&
                    <ul className="sidebarFriendList">
                        {event?.attendees.map((u) => (
                            <Friend key={u} participant={u} />
                        ))}
                    </ul>}
                
            </div>
        </div>
    );
}
