import './rightbar.css';
import { EventContext } from '../../context/eventContext/EventContext';
import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function RightbarEvent () {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {event} = useContext(EventContext);
    const [owner,setOwner] = useState(null);
    console.log(owner);

    useEffect(() => {
        const fetchOwner = async () => {
            if(event){
                try {
                    const res = await axios.get(`/users?userId=${event.userId}`);
                    setOwner(res.data);
                } catch (err) {}
            }
        };
        fetchOwner();
    }, [event]);


    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <div className='ownerContainer'>
                    <h4 className='ownertag'>owner:</h4>
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
                
            </div>
        </div>
    );
}