import './sidebar.css';
import { useContext } from 'react';
import { EventContext } from '../../context/eventContext/EventContext';
import { AuthContext } from '../../context/AuthContext';
import {PersonAdd,PersonRemove} from '@mui/icons-material';
import {Divider,Chip} from '@mui/material';




export default function SidebarEvent() {
    const {event} = useContext(EventContext);
    const { user } = useContext(AuthContext);
    console.log(event,user);

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <button className="sidebarButtonExit" >
                    <PersonRemove className="sidebarIcon" />
                    <span className="sidebarEventText">Leave</span>
                </button>
                <button className="sidebarButtonJoin" >
                    <PersonAdd className="sidebarIcon" />
                    <span className="sidebarEventText">Join</span>
                </button>
                <Divider className="sidebarHr" style = {{marginTop: 30,marginBottom:40}}>
                    <Chip  label="Participants"  />
                </Divider>
                {/* participants */}
                
            </div>
        </div>
    );
}
