import './rightbar.css';
import { AuthContext } from '../../context/AuthContext';
import { EventContext } from '../../context/eventContext/EventContext';
import { useEffect, useContext, useState } from 'react';
import axios from '../../Api';
import { Link } from 'react-router-dom';
export default function RightbarEvent () {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {event} = useContext(EventContext);
    const {user} = useContext(AuthContext);
    const [owner,setOwner] = useState({});
    console.log(owner);
    

    useEffect(() => {
        const fetchOwner = async () => {
          
            try {
                const res = await axios.get(`/users?userId=${event.userId}`);
                setOwner(res.data);
            } catch (err) {}
            
        };
        fetchOwner();
    }, [event.userId]);


    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <div className='ownerContainer'>
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
                {user._id===owner._id && 
                <div className='ownerEventMenu'>
                    <button className='OwnerButtonDelete'>
                        Delete Event
                    </button>
                    <button className='OwnerButtonEdit'>
                        Edit Event
                    </button>
                </div>}
                
            </div>
        </div>
    );
}