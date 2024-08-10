import './rightbar.css';
import { AuthContext } from '../../context/authContext/AuthContext';
import { EventContext } from '../../context/eventContext/EventContext';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EventForm from '../popUpForms/eventForm/EventForm';
import axios from '../../Api';

export default function RightbarEvent () {

    const [showFormEvent, setShowFormEvent] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {owner,event} = useContext(EventContext);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    function togglePopEvent () {
        setShowFormEvent(!showFormEvent);
    };

    const HandleEventDelete = async () => {
        if (window.confirm('Are you sure you want to delete your event?')){
            try {
                await axios.delete(`/events/${event._id}`);
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
                    {showFormEvent ? <EventForm toggle={togglePopEvent} /> : null}
                    <h4 className='ownertag'>Organizer:</h4>
                    <Link
                        to={'/profile/' + owner?.username}
                        style={{ textDecoration: 'none' }}
                    >
                        <div className="rightbarFollowing">
                            <img
                                src={
                                    owner?.profilePicture
                                        ? PF + owner?.profilePicture
                                        : PF + 'person/noAvatar.png'
                                }
                                alt=""
                                className="rightbarFollowingImg"
                            />
                            <span className="rightbarFollowingName">{owner?.username}</span>
                        </div>
                    </Link>
                </div>
                {user._id===owner?._id && 
                <div className='ownerEventMenu'>
                    <button className='OwnerButtonDelete' onClick={HandleEventDelete}>
                        Delete Event
                    </button>
                    <button className='OwnerButtonEdit' onClick={togglePopEvent}>
                        Edit Event
                    </button>
                </div>}
                
            </div>
        </div>
    );
}