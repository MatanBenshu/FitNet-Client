import './rightbar.css';
import { AuthContext } from '../../context/AuthContext';
import { EventContext } from '../../context/eventContext/EventContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
export default function RightbarEvent () {
    
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {owner} = useContext(EventContext);
    const {user} = useContext(AuthContext);
    console.log(owner);
    

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
                {user._id===owner?._id && 
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