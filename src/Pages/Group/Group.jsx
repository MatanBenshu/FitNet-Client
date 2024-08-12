import './Group.css';
import NavBar from '../../components/navBar/navBar';
import { GroupContextProvider } from '../../context/groupContext/GroupContext';
import { useEffect, useContext, useState } from 'react';
import { GroupContext } from '../../context/groupContext/GroupContext';
import { AuthContext } from '../../context/authContext/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import axios from '../../Api';
import { useParams ,useNavigate} from 'react-router-dom';
import  SideBarGroupPublic ,{ SideBarGroupPrivate} from '../../components/sidebar/SideBarGroup';
import { FeedGroup } from '../../components/feed/Feed';
import RightbarGroup from '../../components/rightbar/RightbarGroup';




export default function GroupPage() {

    return (
        <>
            <NavBar />
            <GroupContextProvider>
                <Group/>
            </GroupContextProvider>
        </>
    );
}

export function Group(){
    const { group,groupFetching,groupDispatch ,groupUpdate} = useContext(GroupContext);
    const groupName = useParams().groupname;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                groupDispatch({ type: 'FETCH_GROUP' });

                const groupRes = await axios.get(`/groups/${groupName}`);
                groupDispatch({ type: 'SET_GROUP', payload: groupRes.data });
                console.log(groupRes.data);  // Debugging purposes, remove this line in production!

                const AdminRes = await axios.get(`/users?userId=${groupRes.data.Admin}`);
                groupDispatch({type: 'SET_ADMIN', payload: AdminRes.data});
                console.log(AdminRes.data);  // Debugging purposes, remove this line in production!

                groupDispatch({ type: 'STOP_FETCH' });

            } catch (error) {
                navigate('/page404');
            }
        };
        fetchGroup();
    }, [groupDispatch,groupName,navigate,groupUpdate]);

    if(groupFetching) {
        return(
            <div className='loadingScreen'> <CircularProgress size={120} /></div>
        ); 
    }


    return (
        <>
            {group.type === 'public' && <PublicGroup />}
            {group.type ==='private' && <PrivateGroup />}
        </>
    );
}

export function PublicGroup(){
    return (
        <div className='GroupContainer'>
            <SideBarGroupPublic />
            <FeedGroup/>
            <RightbarGroup />
        </div>
    );
}

export function PrivateGroup(){
    const { group} = useContext(GroupContext);
    const {user} = useContext(AuthContext);

    return (
        <> 
            {!group.followers.includes(user._id)? <PrivateWaitingList/> : 
                <div className='GroupContainer'>

                    <SideBarGroupPrivate />
                    <FeedGroup/>
                    <RightbarGroup />

                </div>}
        </>
    );
}





export function PrivateWaitingList(){

    const { group,groupDispatch} = useContext(GroupContext);
    const {user} = useContext(AuthContext);
    const [waiting,setWaiting] = useState(group.waiting.includes(user._id));
    const [disableButtons,setDisableButtons] = useState(false);

    const handleJoin = async ()=>{
        try {
            setDisableButtons(true);
            await axios.put(`/groups/waiting/${group._id}`,{userId: user._id});
            groupDispatch({ type: 'ADD_WAITING', payload: user._id }); 
            setWaiting(true);
        } catch (error) {
            console.log(error);
        }
        setDisableButtons(false);
    };

    const handleCancel = async ()=>{
        try {
            setDisableButtons(true);
            await axios.put(`/groups/unwaiting/${group._id}`,{userId: user._id});
            groupDispatch({ type: 'REMOVE_WAITING', payload: user._id }); 
            setWaiting(false);
        } catch (error) {
            console.log(error);
        }
        setDisableButtons(false);
    };

    return (
        <div className='waitingList-Wrapper'>
            <div className="waitingList">
                <h2> "{group.groupname}", is a private group.. </h2>
                <h2> You need Admin permission to join </h2>
                <h2> Send request ?  </h2>
                { !waiting ? 
                    <button className='waitingListButton' 
                        disabled={disableButtons} 
                        onClick={()=> handleJoin()}
                    >Join
                    </button> :
                    <button className='waitingListButton'
                        disabled={disableButtons}
                        onClick={()=> handleCancel()}
                    >Cancel
                    </button>
                }
            </div>
        </div>
    );
}