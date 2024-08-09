import './rightbar.css';
import { useContext, useEffect, useState } from 'react';
import axios from '../../Api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function RightBar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const { user } = useContext(AuthContext);
    


    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get('/users/friends/' + user._id);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err);
            }
        };
        getFriends();
    }, [user]);


    const HomeRightbar = () => {
        return (
            <>
                <img className="rightbarAd" src= {PF + 'FitNetLogo.png'} alt="" />
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    {friends.map((friend) => (
                        <Link
                            to={'/profile/' + friend.username}
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="rightbarFollowing">
                                <img
                                    src={
                                        friend.profilePicture
                                            ? PF + friend.profilePicture
                                            : PF + 'person/noAvatar.png'
                                    }
                                    alt=""
                                    className="rightbarFollowingImg"
                                />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        );
    };


    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <HomeRightbar />
            </div>
        </div>
    );
}
