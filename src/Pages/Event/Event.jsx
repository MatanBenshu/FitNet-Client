import './Event.css'; 
import { useLocation ,useNavigate, useParams} from 'react-router-dom';
import { useEffect, useContext } from 'react';
import axios from 'axios';
import NavBar from '../../components/navBar/navBar';
import { EventContextProvider } from '../../context/eventContext/EventContext';
import { EventContext } from '../../context/eventContext/EventContext';
import CircularProgress from '@mui/material/CircularProgress';
import SidebarEvent from '../../components/sidebar/SideBarEvent';
import EventMiddlePage from '../../components/eventMiddlePage/EventMiddlePage';
import RightbarEvent from '../../components/rightbar/RightbarEvent';



export default function EventPage() {

    return (
        <>
            <NavBar />
            <EventContextProvider>
                <Event/>
            </EventContextProvider>
        </>
    );
}
export function Event() {
    const location = useLocation();
    const eventId = new URLSearchParams(location.search).get('id');
    const eventTitle = useParams().title;
    const navigate = useNavigate();
    const {event, eventFetching,eventDispatch} = useContext(EventContext);
    console.log(event);

    useEffect(() => {
        const fetchEvent = async () => {
            try{
                eventDispatch({type: 'FETCH_EVENT'});
                const res = await axios.get('/events/' + eventId);
                if(res.data.title !== eventTitle)
                {
                    navigate('/page404');
                }
                eventDispatch({type: 'SET_EVENT', payload: res.data});
            } catch (err) {
                navigate('/page404');
            }
        };
        fetchEvent();
    }, [eventId,navigate,eventTitle,eventDispatch]);


    if(eventFetching) {
        return(
            <div className='loadingScreen'> <CircularProgress size={120} /></div>
        ); 
    }


    return (
        <div className="eventContainer">
            <SidebarEvent/>
            <EventMiddlePage/>
            <RightbarEvent/>
        </div>
    );
}
