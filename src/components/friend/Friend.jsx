import { useEffect, useState } from 'react';
import './Friend.css';
import axios from '../../Api';
import { Link } from 'react-router-dom';

export default function Friend({participant}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log(participant);
                const res = await axios.get(`/users?userId=${participant}`);
                console.log(res.data);
                setUser(res.data);
            } catch (error) {
            }
        };
        fetchUser();
    }, [participant]);

    return (
        
        (user && (
            <Link
                key ={user.username}
                to={`/profile/${user.username}`}
                style={{ textDecoration: 'none', color: 'black' }}
            >
                <li className="sidebarFriend">
                    <img className="sidebarFriendImg"
                        src={
                            user.profilePicture
                                ? PF + user.profilePicture
                                : PF + 'person/noAvatar.png'
                        } alt="" />
                    <span className="sidebarFriendName">{user.username}</span>
                </li></Link>))

    );
}
