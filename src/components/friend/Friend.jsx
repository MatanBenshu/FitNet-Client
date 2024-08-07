import { useEffect, useState } from 'react';
import './Friend.css';
import axios from 'axios';

export default function Friend({participant}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/users?userId =${participant}`);
                console.log(res.data);
                setUser(res.data);
            } catch (error) {
            }
        };
        fetchUser();
    }, [participant]);

    return (
        <li className="sidebarFriend">
            <img className="sidebarFriendImg" src={PF+user.profilePicture} alt="" />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    );
}
